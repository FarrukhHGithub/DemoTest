import mongoose, { Schema } from 'mongoose';

// Define schema for Web
const WebPatientSchema = new mongoose.Schema({
  patientInfo: {
    id: { type: String },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    address: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true
    },
    emergencyContact: { type: String, required: true },
    attachment: [{ type: String }],
    image: { type: String }
  },

  appointments: [
    {
      selectedSlot: {
        startDateTime: Date,
        endDateTime: Date
      },

      selectedService: {
        serviceName: String,
        price: Number
      },

      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],

  medicalRecords: [
    {
      type: Schema.Types.ObjectId,
      ref: "HealthInfo"
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  },

  status: {
    type: String,
    enum: ["Pending", "Approved", "Cancelled"],
    default: "Pending"
  },

  method: {
    type: String,
    enum: ["Online", "Cash"],
    default: "Online"
  },

  message: String
});

WebPatientSchema.index({ "patientInfo.id": 1 });
WebPatientSchema.index({ "patientInfo.email": 1 });

// Create Web model
const WebPatient = mongoose.model('WebPatient', WebPatientSchema);

export default WebPatient;
