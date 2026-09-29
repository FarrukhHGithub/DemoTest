import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PatientHistorySchema = new Schema(
    {
        patientId: {
            type: Schema.Types.ObjectId,
            ref: "Patient",
            required: true,
        },

        fullName: String,
        profilePicture: String,
        email: String,
        emergencyContact: String,
        bloodGroup: String,
        address: String,
        gender: {
            type: String,
            enum: ["male", "female", "Other"],
        },

        // =======================
        // SNAPSHOT-BASED HISTORY
        // =======================

        medicalRecords: [Schema.Types.Mixed],

        appointments: [Schema.Types.Mixed],

        invoices: [Schema.Types.Mixed],

        payments: [Schema.Types.Mixed],

        images: [Schema.Types.Mixed],

        mentalHealth: [Schema.Types.Mixed],
        healthInformation: [Schema.Types.Mixed],
        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
        },

        serviceName: {
            type: String,
        },

        servicePrice: {
            type: Number,
        },

        appointmentSlotId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TimeSlot",
        },

        appointmentStartDateTime: {
            type: Date,
        },

        appointmentEndDateTime: {
            type: Date,
        },

        method: {
            type: String,
            enum: ["Online", "Physical"],
        },
        // =======================
        // ACTION META
        // =======================

        action: {
            type: String,
            enum: ["created", "updated", "deleted"],
            default: "created",
        },
    },
    { timestamps: true }
);

PatientHistorySchema.index({ patientId: 1 });

export default mongoose.model("PatientHistory", PatientHistorySchema);