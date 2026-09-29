import MedicalRecord from '../../models/MedicalReport/medicalReportModel.js';
import PatientHistory from "../../models/History/historyModel.js";

export const createMedicalRecord = async (req, res) => {
    try {
        console.log("Request Files:", req.files);

        const {
            patientId,
            complaints,
            diagnosis,
            vitalSigns,
            prescription,
            treatment,
            medicine
        } = req.body;

        const parsedPrescription =
            typeof prescription === "string"
                ? JSON.parse(prescription)
                : prescription;

        const parsedTreatment =
            typeof treatment === "string"
                ? JSON.parse(treatment)
                : treatment;

        // Extract uploaded files
        const attachments = req.files.map((file) => ({
            filename: file.filename,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
        }));

        const medicalRecord = new MedicalRecord({
            patient: patientId,
            complaints,
            diagnosis,
            treatment: parsedTreatment,
            vitalSigns,
            prescription: parsedPrescription,
            medicine,
            attachments,
        });

        await medicalRecord.save();

        console.log("Medical record saved successfully");

        // ✅ Save to PatientHistory
        await PatientHistory.updateOne(
            { patientId: patientId },
            {
                $set: {
                    patientId: patientId
                },
                $push: {
                    medicalRecords: medicalRecord.toObject()
                }
            },
            { upsert: true }
        );

        res.status(201).json({
            message: "Medical record created successfully",
            data: {
                medicalRecord,
            },
        });

    } catch (error) {
        console.error("Validation Error:", error.message);
        res.status(500).json({
            message: "Failed to create medical record",
            error: error.message,
        });
    }
};


export const getAllMedicalRecords = async (req, res) => {
    try {
        const medicalRecords = await MedicalRecord.find();
        res.status(200).json({ data: medicalRecords });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch medical records', error: error.message });
    }
};

export const updateMedicalRecord = async (req, res) => {
    try {

        const medicalRecord = await MedicalRecord.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!medicalRecord) {
            return res.status(404).json({
                message: "Medical record not found"
            });
        }

        // console.log("========== UPDATED MEDICAL RECORD ==========");
        // console.log(medicalRecord);
        // console.log("Patient ID:", medicalRecord.patient);

        // Get patientId from updated record
        const patientId = medicalRecord.patient;

        const historyResult = await PatientHistory.updateOne(
            { patientId },
            {
                $set: {
                    patientId
                },
                $push: {
                    medicalRecords: {
                        ...medicalRecord.toObject(),
                        action: "updated",
                        historyCreatedAt: new Date()
                    }
                }
            },
            { upsert: true }
        );

        console.log("========== HISTORY RESULT ==========");
        console.log(historyResult);

        const historyDoc = await PatientHistory.findOne({ patientId });

        console.log("========== HISTORY DOCUMENT ==========");
        console.log(JSON.stringify(historyDoc, null, 2));

        res.status(200).json({
            message: "Medical record updated successfully",
            data: medicalRecord
        });

    } catch (error) {
        console.error("UPDATE ERROR:", error);

        res.status(500).json({
            message: "Failed to update medical record",
            error: error.message
        });
    }
};
export const getMedicalRecordsByPatientId = async (req, res) => {
    try {
        const patientId = req.params.id;
        // Find medical records by patient ID
        const medicalRecords = await MedicalRecord.find({ patient: patientId });
        res.status(200).json({ success: true, data: medicalRecords });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
export const deleteMedicalRecord = async (req, res) => {
    try {
        const medicalRecord = await MedicalRecord.findByIdAndDelete(req.params.id);
        if (!medicalRecord) {
            return res.status(404).json({ message: 'Medical record not found' });
        }
        res.status(200).json({ message: 'Medical record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete medical record', error: error.message });
    }
};
// MedicalRecordController.js