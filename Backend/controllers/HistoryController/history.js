import PatientHistory from "../../models/History/historyModel.js";

export const getPatientHistoryByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        const history = await PatientHistory.find({ email })
            .sort({ createdAt: -1 });

        console.log("=================================");
        console.log("EMAIL:", email);
        console.log("TOTAL HISTORY RECORDS:", history.length);

        history.forEach((item, index) => {
            console.log(`Record ${index + 1}`);
            console.log("Patient ID:", item.patientId);
            console.log("Health Information:", item.healthInformation?.length || 0);

            console.log("Medical Records Count:", item.medicalRecords?.length || 0);
            console.log("Created At:", item.createdAt);
            console.log("-------------------------");
        });

        res.status(200).json(history);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
};