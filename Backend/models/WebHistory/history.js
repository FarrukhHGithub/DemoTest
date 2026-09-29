import mongoose, { Schema } from "mongoose";

const WebHistorySchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "WebPatient",
    required: true,
  },

  patientInfo: {
    id: String,
    name: String,
    gender: String,
    bloodGroup: String,
    address: String,
    email: String,
    emergencyContact: String,
    attachment: [String],
    image: String,
  },

  appointment: {
    selectedSlot: {
      startDateTime: Date,
      endDateTime: Date,
    },

    selectedService: {
      serviceName: String,
      price: Number,
    },
  },

  status: {
    type: String,
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

WebHistorySchema.index({ patientId: 1 });

export default mongoose.model("WebHistory", WebHistorySchema);