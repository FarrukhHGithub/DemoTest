// controllers/invoiceController.js
import Invoice from '../../models/Invoice/invoiceModel.js';
import PatientHistory from "../../models/History/historyModel.js";

export const createInvoice = async (req, res) => {
    try {
        const {
            selectedPatient,
            selectedService,
            invoiceItems,
            tax,
            discount,
            currency
        } = req.body;

        const subtotal = invoiceItems.reduce(
            (acc, item) => acc + (item.price * item.quantity),
            0
        );

        const grandTotal = req.body.grandTotal;

        const invoice = new Invoice({
            patient: selectedPatient._id,
            services: selectedService ? [selectedService._id] : [],
            invoiceItems,
            total: grandTotal,
            dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
            currency
        });

        await invoice.save();

        const populatedInvoice = await Invoice.findById(invoice._id)
            .populate("patient", "fullName email profilePicture")
            .populate("services", "name");

        // ✅ Save to PatientHistory (same pattern as others)
        // await PatientHistory.updateOne(
        //     { patientId: populatedInvoice.patient._id },
        //     {
        //         $set: {
        //             patientId: populatedInvoice.patient._id
        //         },
        //         $push: {
        //             invoices: populatedInvoice.toObject()
        //         }
        //     },
        //     { upsert: true }
        // );

        res.status(201).json({
            invoice: populatedInvoice,
            grandTotal,
            tax,
            discount,
            currency
        });

    } catch (error) {
        console.error("Error creating invoice:", error);
        res.status(500).json({ error: "Failed to create invoice" });
    }
};




// Get all invoices
export const getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find()
            .populate('patient', 'fullName email profilePicture') // Populate patient details
            .populate('services', 'name')
            .lean(); // Populate service names
        res.status(200).json(invoices);
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(500).json({ error: 'Failed to fetch invoices' });
    }
};

export const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params; // Extract invoice ID from request parameters
        const invoice = await Invoice.findById(id)
            .populate('patient', 'fullName email profilePicture')
            .populate('services', 'name')
            .lean();

        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        res.status(200).json(invoice);
    } catch (error) {
        console.error('Error fetching invoice by ID:', error);
        res.status(500).json({ error: 'Failed to fetch invoice' });
    }
};


export const updateInvoice = async (req, res) => {
    try {
        const { tax, discount, status } = req.body;

        const updatedInvoice = await Invoice.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                status,
                grandTotal:
                    (req.body.total || 0) -
                    (discount || 0) +
                    (tax || 0),
            },
            { new: true }
        )
            .populate("patient", "fullName email profilePicture")
            .populate("services", "name");

        if (!updatedInvoice) {
            return res.status(404).json({
                message: "Invoice not found",
            });
        }

        // console.log("========== UPDATED INVOICE ==========");
        // console.log(updatedInvoice);
        // console.log("Patient ID:", updatedInvoice.patient._id);

        const patientId = updatedInvoice.patient._id;

        // const historyResult = await PatientHistory.updateOne(
        //     { patientId },
        //     {
        //         $set: {
        //             patientId,
        //         },
        //         $push: {
        //             invoices: {
        //                 ...updatedInvoice.toObject(),
        //                 action: "updated",
        //                 historyCreatedAt: new Date(),
        //             },
        //         },
        //     },
        //     { upsert: true }
        // );

        // console.log("========== HISTORY RESULT ==========");
        // console.log(historyResult);

        const historyDoc = await PatientHistory.findOne({ patientId }).lean();

        // console.log("========== HISTORY DOCUMENT ==========");
        // console.log(JSON.stringify(historyDoc, null, 2));

        res.status(200).json({
            message: "Invoice updated successfully",
            invoice: updatedInvoice,
        });
    } catch (error) {
        console.error("UPDATE ERROR:", error);

        res.status(500).json({
            message: "Failed to update invoice",
            error: error.message,
        });
    }
};


// controllers/invoiceController.js

// Get invoices by patient ID
export const getInvoicesByPatientId = async (req, res) => {
    try {
        const { patientId } = req.params;
        // console.log('Patient ID:', patientId); // Add this line

        // Find invoices for the specified patient ID
        const invoices = await Invoice.find({ patient: patientId })
            .populate('patient', 'fullName email profilePicture')
            .populate('services', 'name')
            .lean();
        // console.log('Invoices:', invoices); // Add this line

        if (invoices.length === 0) {
            return res.status(404).json({ error: 'No invoices found for the specified patient ID' });
        }

        res.status(200).json(invoices);
    } catch (error) {
        console.error('Error fetching invoices by patient ID:', error);
        res.status(500).json({ error: 'Failed to fetch invoices' });
    }
};




export const deleteInvoice = async (req, res) => {
    try {
        const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!deletedInvoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        console.error('Error deleting invoice:', error);
        res.status(500).json({ error: 'Failed to delete invoice' });
    }
};
