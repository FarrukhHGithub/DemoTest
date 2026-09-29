import WebPatient from '../models/webModels.js'
import mongoose from 'mongoose';
import Invoice from '../models/Invoice/invoiceModel.js';
import WebHistory from "../models/WebHistory/history.js";
import Patient from '../models/PatientModel/patient.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

export const createWeb = async (req, res) => {
  const {
    id,
    name,
    email,
    image,
    emergencyContact,
    reasonForVisit,
    gender,
    address,
    bloodGroup,
    endDateTime,
    startDateTime,
    serviceName,
    price,
  } = req.body;

  try {
    console.log("=================================");
    console.log("Creating Web Appointment");
    console.log(req.body);

    let patient = await WebPatient.findOne({
      "patientInfo.email": email,
    });

    const appointmentData = {
      selectedSlot: {
        startDateTime,
        endDateTime,
      },

      selectedService: {
        serviceName,
        price,
      },
    };

    let attachments = [];

    if (req.files?.length > 0) {
      const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer, 'attachments'));
      const uploadResults = await Promise.all(uploadPromises);
      attachments = uploadResults.map(result => result.secure_url);
    }

    // =============================
    // EXISTING PATIENT
    // =============================
    if (patient) {
      console.log("Existing patient found:", patient._id);

      patient.appointments.push(appointmentData);

      if (attachments.length) {
        patient.patientInfo.attachment = [
          ...(patient.patientInfo.attachment || []),
          ...attachments,
        ];
      }

      await patient.save();

      console.log("WebPatient updated successfully.");

      const history = await WebHistory.create({
        patientId: patient._id,
        patientInfo: patient.patientInfo,
        appointment: appointmentData,
        status: patient.status,
      });

      console.log("WebHistory saved successfully.");
      console.log(history);

      return res.status(200).json({
        success: true,
        message: "Appointment added to existing patient",
        data: patient,
      });
    }

    // =============================
    // NEW PATIENT
    // =============================

    console.log("Creating new patient...");

    patient = await WebPatient.create({
      patientInfo: {
        id,
        name,
        image,
        email,
        emergencyContact,
        reasonForVisit,
        gender,
        address,
        bloodGroup,
        attachment: attachments,
      },

      appointments: [appointmentData],
    });

    console.log("New WebPatient created.");
    console.log(patient);

    const history = await WebHistory.create({
      patientId: patient._id,
      patientInfo: patient.patientInfo,
      appointment: appointmentData,
      status: patient.status,
    });

    console.log("WebHistory created successfully.");
    console.log(history);

    return res.status(201).json({
      success: true,
      message: "New patient created",
      data: patient,
    });
  } catch (error) {
    console.error("Error while creating appointment");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllAppointments = async (req, res) => {
  try {
    const { gender, source } = req.query;
    console.log('📊 Fetching all appointments with filters:', { gender, source });

    let webQuery = {};
    let patientQuery = { isArchived: false }; // Only non-archived patients

    // Apply gender filter
    if (gender && gender !== 'all') {
      const genderValue = gender.toLowerCase();
      webQuery['patientInfo.gender'] = genderValue;
      patientQuery.gender = genderValue;
    }

    // Fetch web appointments
    let webAppointments = [];
    if (!source || source === 'web' || source === 'all') {
      webAppointments = await WebPatient.find(webQuery).lean();
      console.log('📊 Web appointments found:', webAppointments.length);
    }

    // Fetch patient appointments (only those with appointment dates)
    let patientAppointments = [];
    if (!source || source === 'patient' || source === 'all') {
      // Only get patients with appointment dates
      patientQuery.appointmentStartDateTime = { $ne: null };
      patientAppointments = await Patient.find(patientQuery)
        .select('fullName email emergencyContact bloodGroup address gender serviceName servicePrice appointmentStartDateTime appointmentEndDateTime method isArchived createdAt updatedAt')
        .lean();
      console.log('📊 Patient appointments found:', patientAppointments.length);
    }

    // Format patient appointments to match web appointment structure
    const formattedPatientAppointments = patientAppointments.map(patient => ({
      _id: patient._id,
      patientInfo: {
        name: patient.fullName,
        email: patient.email,
        phone: patient.emergencyContact,
        emergencyContact: patient.emergencyContact,
        bloodGroup: patient.bloodGroup,
        address: patient.address,
        gender: patient.gender,
        isArchived: patient.isArchived
      },
      appointments: [{
        _id: patient._id,
        selectedService: {
          serviceName: patient.serviceName,
          price: patient.servicePrice
        },
        selectedSlot: {
          startDateTime: patient.appointmentStartDateTime,
          endDateTime: patient.appointmentEndDateTime
        },
        status: 'Approved', // Default status for patient appointments
      }],
      status: 'Approved',
      method: patient.method || 'Physical',
      source: 'patient',
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt
    }));

    // Combine both sources
    let allAppointments = [];

    // Add web appointments with source label
    webAppointments.forEach(appointment => {
      allAppointments.push({
        ...appointment.toObject ? appointment.toObject() : appointment,
        source: 'web'
      });
    });

    // Add patient appointments with source label
    formattedPatientAppointments.forEach(appointment => {
      allAppointments.push({
        ...appointment,
        source: 'patient'
      });
    });

    // Sort by createdAt (newest first)
    allAppointments.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    console.log('📊 Total appointments combined:', allAppointments.length);
    console.log('📊 Web appointments count:', webAppointments.length);
    console.log('📊 Patient appointments count:', formattedPatientAppointments.length);

    res.status(200).json({
      success: true,
      count: allAppointments.length,
      data: allAppointments,
      stats: {
        web: webAppointments.length,
        patient: formattedPatientAppointments.length,
        total: allAppointments.length
      }
    });

  } catch (error) {
    console.error('❌ Error fetching appointments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
      error: error.message
    });
  }
};
export const getAllWebs = async (req, res) => {
  try {
    const { id, gender } = req.params;
    // console.log('Received parameters for webs:', { id, gender }); // Log received parameters
    let query = {};
    const { gender: genderQuery } = req.query;

    if (genderQuery && genderQuery !== 'all') {
      const genderValue = genderQuery.toLowerCase();
      // console.log('Gender filter applied for webs:', genderValue); // Log the applied gender filter
      query['patientInfo.gender'] = genderValue;
    }

    if (id) {
      query['patientInfo.id'] = id;
    }

    // console.log('Generated MongoDB query for webs:', query);

    const webs = await WebPatient.find(query).lean();
    res.status(200).json(webs);
  } catch (error) {
    console.error('Error fetching webs:', error); // Log any errors
    res.status(500).json({ message: error.message });
  }
};
export const getWebByIds = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await WebPatient.find({ "patientInfo.id": id }).lean();

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Web not found' });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching Web by id:', error); // Log the error here
    res.status(500).json({ message: 'Server Error' });
  }
};
export const updateWeb = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedWeb = await WebPatient.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedWeb) {
      return res.status(404).json({ message: 'Web not found' });
    }

    res.status(200).json(updatedWeb);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteWeb = async (req, res) => {
  try {
    const { id } = req.params;
    await WebPatient.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Web patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting web patient:', error);
    res.status(500).json({ success: false, message: 'Failed to delete web patient' });
  }
};
export const getTotalWebPatientCount = async (req, res) => {
  try {
    // console.log('Received request for total web patient count');
    const totalCount = await WebPatient.countDocuments();
    const targetCount = 100;
    const percentage = (totalCount / targetCount) * 100;
    // console.log('Total web patient count:', totalCount);
    // console.log('Percentage:', percentage);
    res.status(200).json({ totalCount, percentage });
  } catch (error) {
    console.error('Error counting web patients:', error);
    res.status(500).json({ message: 'Error counting web patients', error: error.message });
  }
};

export const getTodayWebAppointments = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    console.log("📅 Today's date:", today);
    console.log("📅 Tomorrow's date:", tomorrow);

    // 1️⃣ Fetch today's WebPatient appointments
    const webAppointments = await WebPatient.find({
      createdAt: { $gte: today, $lt: tomorrow },
    }).lean();

    console.log("📊 Web appointments found:", webAppointments.length);

    // 2️⃣ Fetch today's Patient appointments (from Patient schema)
    // Check if patient has appointments with start date today
    const patientAppointments = await Patient.find({
      isArchived: false, // Only active patients
      appointmentStartDateTime: {
        $gte: today,
        $lt: tomorrow
      }
    }).lean();

    console.log("📊 Patient appointments found:", patientAppointments.length);

    // 3️⃣ Combine both results
    const combinedAppointments = [...webAppointments, ...patientAppointments];

    console.log("📊 Total today's appointments:", combinedAppointments.length);

    res.status(200).json({
      success: true,
      count: combinedAppointments.length,
      data: combinedAppointments,
      webAppointments: webAppointments,
      patientAppointments: patientAppointments
    });

  } catch (error) {
    console.error('Error fetching today\'s appointments:', error);
    res.status(500).json({
      message: 'Error fetching today\'s appointments',
      error: error.message
    });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const notifications = await WebPatient.find().lean();
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
  }
};

export const markAllNotificationsAsRead = async (req, res) => {
  try {
    await WebPatient.updateMany({}, { status: 'Read' });
    res.status(200).json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({ success: false, message: 'Failed to mark all notifications as read' });
  }
};
export const getWebById = async (req, res) => {
  try {
    const { id } = req.params;

    const web = await WebPatient.findById(id).lean();

    if (!web) {
      return res.status(404).json({ message: 'Web not found' });
    }
    res.status(200).json(web);
  } catch (error) {
    console.error('Error fetching Web by id:', error); // Log the error here
    res.status(500).json({ message: 'Server Error' });
  }
};
// Controller to get monthly earnings
export const getMonthlyEarnings = async (req, res) => {
  try {
    // 🔹 1. Earnings from WebPatient (your existing)
    const webEarnings = await WebPatient.aggregate([
      {
        $match: {
          status: "Approved",
        },
      },
      { $unwind: "$appointments" },
      {
        $group: {
          _id: {
            month: { $month: "$appointments.createdAt" },
            serviceName: "$appointments.selectedService.serviceName",
            servicePrice: "$appointments.selectedService.price",
          },
          serviceCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          serviceName: "$_id.serviceName",
          servicePrice: { $toDouble: "$_id.servicePrice" },
          serviceCount: 1,
          monthlyEarnings: {
            $multiply: [{ $toDouble: "$_id.servicePrice" }, "$serviceCount"],
          },
        },
      },
    ]);

    // 🔹 2. Earnings from PAID invoices
    const invoiceEarnings = await Invoice.aggregate([
      {
        $match: {
          status: { $in: ["paid", "Paid"] },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdDate" },
          },
          total: { $sum: { $toDouble: "$total" } },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          monthlyEarnings: "$total",
          serviceName: "Invoice",
          servicePrice: "$total",
          serviceCount: "$count",
        },
      },
    ]);

    // console.log("Grouped Invoice Earnings:", invoiceEarnings);

    // console.log("Invoice Earnings:", invoiceEarnings);
    const allEarnings = [...webEarnings, ...invoiceEarnings];
    const monthlyData = Array.from({ length: 12 }, (_, index) => ({
      month: index + 1,
      totalEarnings: 0,
      services: [],
    }));
    allEarnings.forEach((entry) => {
      const monthIndex = entry.month - 1;

      monthlyData[monthIndex].totalEarnings += entry.monthlyEarnings;

      monthlyData[monthIndex].services.push({
        name: entry.serviceName,
        price: entry.servicePrice,
        count: entry.serviceCount,
        earnings: entry.monthlyEarnings,
      });
    });

    res.status(200).json({ monthlyData });
  } catch (error) {
    console.error("Error fetching monthly earnings:", error);
    res.status(500).json({
      message: "Error fetching monthly earnings",
      error: error.message,
    });
  }
};

export const getWebByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const data = await WebPatient.findOne({
      "patientInfo.email": email,
    }).populate("medicalRecords").lean();

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

