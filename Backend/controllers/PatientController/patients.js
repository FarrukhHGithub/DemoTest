import Patient from '../../models/PatientModel/patient.js';
import mongoose from 'mongoose';
import MedicalRecord from '../../models/MedicalReport/medicalReportModel.js';
import PatientHistory from "../../models/History/historyModel.js";
export const createPatient = async (req, res) => {
    try {
        const {
            firstName,
            email,
            gender,
            emergencyContact,
            address,
            bloodGroup,

            serviceId,
            serviceName,
            servicePrice,

            appointmentSlotId,
            appointmentStartDateTime,
            appointmentEndDateTime,

            method,
        } = req.body;

        const profilePicture = req.file;

        // REMOVED: Check if patient already exists
        // Now we allow creating patients even if email exists

        // Create new patient
        const patient = new Patient({
            fullName: firstName,
            email,
            gender,
            emergencyContact,
            address,
            bloodGroup,

            serviceId,
            serviceName,
            servicePrice,

            appointmentSlotId,
            appointmentStartDateTime,
            appointmentEndDateTime,

            method,

            profilePicture: profilePicture ? profilePicture.path : null,
        });

        await patient.save();

        // Create initial patient history
        const patientHistory = new PatientHistory({
            patientId: patient._id,

            fullName: patient.fullName,
            profilePicture: patient.profilePicture,
            email: patient.email,
            emergencyContact: patient.emergencyContact,
            bloodGroup: patient.bloodGroup,
            address: patient.address,
            gender: patient.gender,

            serviceId: patient.serviceId,
            serviceName: patient.serviceName,
            servicePrice: patient.servicePrice,

            appointmentSlotId: patient.appointmentSlotId,
            appointmentStartDateTime: patient.appointmentStartDateTime,
            appointmentEndDateTime: patient.appointmentEndDateTime,

            method: patient.method,

            medicalRecords: patient.medicalRecords,
            appointments: patient.appointments,
            invoices: patient.invoices,
            payments: patient.payments,
            images: patient.images,
            mentalHealth: patient.mentalHealth,

            action: "created",
        });

        await patientHistory.save();

        res.status(201).json({
            success: true,
            message: "Patient created successfully.",
            patient,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
export const getAllPatients = async (req, res, next) => {
    try {
        const { search, gender, startDate } = req.query;
        //   console.log('Received query parameters:', { search, gender, startDate });
        let query = {};

        if (search) {
            query.fullName = { $regex: search, $options: 'i' };
        }

        if (gender && gender !== 'all') {
            // Convert gender to lowercase for consistency
            const genderValue = gender.toLowerCase();
            // console.log('Gender filter applied:', genderValue); // Log the applied gender filter
            query['gender'] = genderValue; // Modify to directly set the 'gender' field
        }

        if (startDate) {
            const selectedDate = new Date(startDate);
            selectedDate.setHours(0, 0, 0, 0);
            const nextDay = new Date(selectedDate);
            nextDay.setDate(nextDay.getDate() + 1);
            query.createdAt = { $gte: selectedDate, $lt: nextDay };
        }

        //   console.log('Generated MongoDB query:', query); // Log the generated query

        const patients = await Patient.find(query).lean();
        res.status(200).json(patients);
    } catch (err) {
        console.error('Error fetching patients:', err); // Log any errors
        next(err);
    }
};
export const getAllActivePatients = async (req, res, next) => {
    try {
        const { search, gender, startDate } = req.query;
        
        // Build query - only get non-archived patients
        let query = { isArchived: false }; // Exclude archived patients

        // Search by full name (case-insensitive)
        if (search) {
            query.fullName = { $regex: search, $options: 'i' };
        }

        // Filter by gender
        if (gender && gender !== 'all') {
            const genderValue = gender.toLowerCase();
            query.gender = genderValue;
        }

        // Filter by creation date
        if (startDate) {
            const selectedDate = new Date(startDate);
            selectedDate.setHours(0, 0, 0, 0);
            const nextDay = new Date(selectedDate);
            nextDay.setDate(nextDay.getDate() + 1);
            query.createdAt = { $gte: selectedDate, $lt: nextDay };
        }

        const patients = await Patient.find(query)
            .sort({ createdAt: -1 })
            .lean(); // Sort by newest first (optional)

        res.status(200).json({
            success: true,
            count: patients.length,
            data: patients
        });

    } catch (err) {
        console.error('Error fetching active patients:', err);
        next(err);
    }
};



// export const getAllPatients = async (req, res, next) => {
//     try {
//         const { search, gender, startDate } = req.query;
//         let patients = [];
//         let query = {};

//         if (search) {
//             query.fullName = { $regex: search, $options: 'i' };
//         }

//         // Modify the query to include gender filter
//         if (gender && gender !== 'all') { // Check if gender is provided and not 'all'
//             let genderValue = gender.toLowerCase(); // Convert to lowercase for consistency
//             // If the selected gender is 'male', directly set the query field to 'Male'
//             // Otherwise, use a case-insensitive regular expression to match any case of the provided gender value
//             query.gender = (genderValue === 'male') ? 'Male' : { $regex: new RegExp(genderValue, 'i') };
//         }

//         if (startDate) {
//             const selectedDate = new Date(startDate);
//             selectedDate.setHours(0, 0, 0, 0);
//             const nextDay = new Date(selectedDate);
//             nextDay.setDate(nextDay.getDate() + 1);
//             query.createdAt = { $gte: selectedDate, $lt: nextDay };
//         }

//         console.log('Generated MongoDB query:', query); // Add this line to log the query

//         patients = await Patient.find(query);
//         res.status(200).json(patients);
//     } catch (err) {
//         next(err);
//     }
// };

export const getMedicalRecordsByPatientId = async (req, res) => {
    try {
        const patientId = req.params.id;
        const medicalRecords = await MedicalRecord.find({ patientId }).lean();
        res.status(200).json({ data: medicalRecords });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch medical records for the patient', error: error.message });
    }
};

// Controller to get a patient by ID
export const getPatientById = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check if the ID is valid ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid patient ID' });
        }

        const patient = await Patient.findById(id).lean();

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (err) {
        next(err);
    }
};
export const getTotalPatientCount = async (req, res) => {
    try {
        const totalCount = await Patient.countDocuments();
        res.json({ totalCount });
    } catch (err) {
        console.error('Error getting total patient count:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const fetchRecentPatients = async (req, res) => {
    try {
        // Fetch patients sorted by creation timestamp in descending order (most recent first)
        const recentPatients = await Patient.find().sort({ createdAt: -1 }).limit(5).lean(); // Adjust limit according to your requirement
        res.status(200).json(recentPatients);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch recent patients', error: error.message });
    }
};
// Controller to update a patient by ID
export const updatePatient = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedFields = req.body;
  
      const oldPatient = await Patient.findById(id).lean();
  
      const updatedPatient = await Patient.findByIdAndUpdate(
        id,
        updatedFields,
        { new: true }
      );
  
      if (!updatedPatient) {
        return res.status(404).json({
          message: "Patient not found"
        });
      }
  
      // ✅ safe change detection (fix nested issue)
      const changes = {};
  
      Object.keys(updatedFields).forEach((key) => {
        const oldVal = oldPatient?.[key];
        const newVal = updatedPatient?.[key];
  
        if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
          changes[key] = {
            old: oldVal,
            new: newVal
          };
        }
      });
  
      // ❗ ONLY log event, not full snapshot
    //   await PatientHistory.create({
    //     patientId: updatedPatient._id,
    //     action: "updated",
    //     changedFields: changes,
    //     createdAt: new Date()
    //   });
  
      res.status(200).json({
        message: "Patient updated successfully",
        patient: updatedPatient,
      });
  
    } catch (err) {
      next(err);
    }
  };

// Controller to delete a patient by ID
export const deletePatient = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check if the ID is valid ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid patient ID' });
        }

        const archivedPatient = await Patient.findByIdAndUpdate(
            id,
            {
                isArchived: true,
                archivedAt: new Date(),
            },
            {
                new: true
            }
        );

        if (!archivedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Patient archived successfully',
            patient: archivedPatient
        });
    } catch (err) {
        next(err);
    }
};

export const changePassword = async (req, res) => {
    const { id: patientId, oldPassword, newPassword } = req.body;

    try {
        // Find the patient by ID
        const patient = await Patient.findById(patientId);

        // Log the received patient ID
        // console.log('Received patient ID:', patientId);

        // Check if the patient exists
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Check if the old password matches
        const isMatch = await bcrypt.compare(oldPassword, patient.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid old password' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the patient's password
        patient.password = hashedPassword;
        await patient.save();

        // Send a success response
        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getArchivedPatients = async (req, res, next) => {
    try {
        const patients = await Patient.find({ isArchived: true }).lean();

        res.status(200).json({
            success: true,
            count: patients.length,
            data: patients
        });
    } catch (err) {
        next(err);
    }
};

export const restorePatient = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid patient ID"
            });
        }

        const patient = await Patient.findByIdAndUpdate(
            id,
            {
                isArchived: false,
                archivedAt: null
            },
            {
                new: true
            }
        );

        if (!patient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Patient restored successfully",
            patient
        });
    } catch (err) {
        next(err);
    }
};

export const restorePatientByEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        // Find patient by email (case-insensitive)
        const patient = await Patient.findOne({ 
            email: { $regex: new RegExp(`^${email}$`, 'i') }
        });

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found with this email"
            });
        }

        // Check if patient is archived
        if (!patient.isArchived) {
            return res.status(400).json({
                success: false,
                message: "Patient is not archived"
            });
        }

        // Restore the patient
        patient.isArchived = false;
        patient.archivedAt = null;
        patient.archivedBy = null;
        await patient.save();

        // Optional: Create history entry for restoration
        // const patientHistory = new PatientHistory({
        //     patientId: patient._id,
        //     action: "restored",
        //     changedFields: {
        //         isArchived: { old: true, new: false },
        //         archivedAt: { old: patient.archivedAt, new: null }
        //     }
        // });
        // await patientHistory.save();

        res.status(200).json({
            success: true,
            message: "Patient restored successfully",
            patient
        });

    } catch (err) {
        console.error('Error restoring patient by email:', err);
        next(err);
    }
};

/**
 * Archive a patient by email address
 * Expected body: { email: "user@example.com" }
 */
export const archivePatientByEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        // Find patient by email (case-insensitive)
        const patient = await Patient.findOne({ 
            email: { $regex: new RegExp(`^${email}$`, 'i') }
        });

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found with this email"
            });
        }

        // Check if patient is already archived
        if (patient.isArchived) {
            return res.status(400).json({
                success: false,
                message: "Patient is already archived"
            });
        }

        // Archive the patient
        patient.isArchived = true;
        patient.archivedAt = new Date();
        patient.archivedBy = req.user?._id || null; // If you have user authentication
        await patient.save();

        // Optional: Create history entry for archiving
        // const patientHistory = new PatientHistory({
        //     patientId: patient._id,
        //     action: "archived",
        //     changedFields: {
        //         isArchived: { old: false, new: true },
        //         archivedAt: { old: null, new: new Date() }
        //     }
        // });
        // await patientHistory.save();

        res.status(200).json({
            success: true,
            message: "Patient archived successfully",
            patient
        });

    } catch (err) {
        console.error('Error archiving patient by email:', err);
        next(err);
    }
};

/**
 * Search archived patients with filters
 * Supports search by name, email, contact, gender, blood group, date range
 */
export const searchArchivedPatients = async (req, res, next) => {
    try {
        const { search, gender, bloodGroup, startDate, endDate } = req.query;
        
        let query = { isArchived: true };

        // Search by name or email or contact
        if (search) {
            query.$or = [
                { fullName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { emergencyContact: { $regex: search, $options: 'i' } }
            ];
        }

        // Filter by gender
        if (gender && gender !== 'all') {
            query.gender = gender.toLowerCase();
        }

        // Filter by blood group
        if (bloodGroup && bloodGroup !== 'all') {
            query.bloodGroup = { $regex: new RegExp(`^${bloodGroup}$`, 'i') };
        }

        // Filter by archived date range
        if (startDate) {
            const start = new Date(startDate);
            start.setHours(0, 0, 0, 0);
            
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                query.archivedAt = { $gte: start, $lte: end };
            } else {
                query.archivedAt = { $gte: start };
            }
        }

        const patients = await Patient.find(query)
            .sort({ archivedAt: -1 }) // Most recently archived first
            .select('-__v')
            .lean(); // Exclude __v field

        res.status(200).json({
            success: true,
            count: patients.length,
            data: patients
        });

    } catch (err) {
        console.error('Error searching archived patients:', err);
        next(err);
    }
};

/**
 * Bulk restore multiple patients by email array
 * Expected body: { emails: ["user1@example.com", "user2@example.com"] }
 */
export const bulkRestorePatientsByEmail = async (req, res, next) => {
    try {
        const { emails } = req.body;

        if (!emails || !Array.isArray(emails) || emails.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Array of emails is required"
            });
        }

        const results = [];
        const errors = [];

        for (const email of emails) {
            try {
                const patient = await Patient.findOne({ 
                    email: { $regex: new RegExp(`^${email}$`, 'i') }
                });

                if (!patient) {
                    errors.push({ email, error: "Patient not found" });
                    continue;
                }

                if (!patient.isArchived) {
                    errors.push({ email, error: "Patient is not archived" });
                    continue;
                }

                patient.isArchived = false;
                patient.archivedAt = null;
                patient.archivedBy = null;
                await patient.save();

                results.push({
                    email,
                    success: true,
                    patient: {
                        _id: patient._id,
                        fullName: patient.fullName,
                        email: patient.email
                    }
                });
            } catch (err) {
                errors.push({ email, error: err.message });
            }
        }

        res.status(200).json({
            success: true,
            message: `Restored ${results.length} patients, ${errors.length} failed`,
            data: {
                restored: results,
                failed: errors
            }
        });

    } catch (err) {
        console.error('Error bulk restoring patients:', err);
        next(err);
    }
};

/**
 * Get archived patient by email
 * Returns archived patient details for a specific email
 */
export const getArchivedPatientByEmail = async (req, res, next) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const patient = await Patient.findOne({ 
            email: { $regex: new RegExp(`^${email}$`, 'i') },
            isArchived: true
        }).lean();

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "No archived patient found with this email"
            });
        }

        res.status(200).json({
            success: true,
            data: patient
        });

    } catch (err) {
        console.error('Error fetching archived patient by email:', err);
        next(err);
    }
};
export default Patient;
