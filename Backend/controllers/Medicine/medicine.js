

// Importing required modules
import Medicine from '../../models/Medicine/medicine.js';
import PatientHistory from "../../models/History/historyModel.js";

const getAllMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.status(200).json(medicines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createMedicine = async (req, res) => {
    const {
        patientId,
        medicineName,
        measure,
        price,
        inStock,
        description
    } = req.body;

    if (typeof inStock !== "boolean") {
        return res.status(400).json({
            message: "Invalid value for inStock field"
        });
    }

    const medicine = new Medicine({
        medicineName,
        measure,
        price,
        inStock,
        description
    });

    try {
        const newMedicine = await medicine.save();

        // ✅ Save to PatientHistory (if patientId exists)
        if (patientId) {
            await PatientHistory.updateOne(
                { patientId: patientId },
                {
                    $set: { patientId },
                    $push: {
                        medicines: newMedicine.toObject()
                    }
                },
                { upsert: true }
            );
        }

        res.status(201).json(newMedicine);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
const getMedicineById = async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (medicine) {
            medicine.populate('measure').execPopulate();
            res.json(medicine);
        } else {
            res.status(404).json({ message: 'Medicine not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);

        if (medicine) {
            await medicine.remove();

            const updatedMedicine = new Medicine({
                _id: req.params.id,
                medicineName: req.body.medicineName || medicine.medicineName,
                measure: req.body.measure || medicine.measure,
                price: req.body.price || medicine.price,
                inStock: req.body.inStock !== undefined ? req.body.inStock : medicine.inStock,
                description: req.body.description || medicine.description
            });

            const savedMedicine = await updatedMedicine.save();

            // ✅ Save to PatientHistory
            await PatientHistory.updateOne(
                { patientId: patientId },
                {
                    $set: { patientId },
                    $push: {
                        medicines: newMedicine.toObject()
                    }
                },
                { upsert: true }
            );

            return res.json(savedMedicine);
        }

        res.status(404).json({ message: "Medicine not found" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (medicine) {
            await medicine.remove();
            res.json({ message: 'Medicine deleted' });
        } else {
            res.status(404).json({ message: 'Medicine not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export { getAllMedicines, createMedicine, getMedicineById, updateMedicine, deleteMedicine };
