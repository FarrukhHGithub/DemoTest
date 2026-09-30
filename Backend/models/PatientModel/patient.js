import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PatientSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    profilePicture: {
      type: String,
      default: null,
    },

    email: {
      type: String,
      required: true,
    },

    emergencyContact: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "Other"],
      required: true,
    },

    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },

    serviceName: {
      type: String,
    },

    servicePrice: {
      type: Number,
    },

    // ===== Appointment Details =====
    appointmentSlotId: {
      type: Schema.Types.ObjectId,
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
      required: true,
    },

    medicalRecords: [
      {
        type: Schema.Types.ObjectId,
        ref: "HealthInfo",
      },
    ],

    appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],

    invoices: [
      {
        type: Schema.Types.ObjectId,
        ref: "Invoice",
      },
    ],

    payments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],

    images: [
      {
        type: Schema.Types.ObjectId,
        ref: "Image",
      },
    ],

    mentalHealth: {
      type: Schema.Types.ObjectId,
      ref: "MentalHealth",
    },
    isArchived: {
      type: Boolean,
      default: false
    },
    archivedAt: {
      type: Date,
      default: null
    },
    archivedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    }
  },
  { timestamps: true }
);

PatientSchema.index({ email: 1 });
PatientSchema.index({ isArchived: 1 });
PatientSchema.index({ createdAt: -1 });

export default mongoose.model("Patient", PatientSchema);