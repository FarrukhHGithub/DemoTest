import mongoose from 'mongoose';

const timeSlotSchema = new mongoose.Schema({
    startDateTime: { type: Date, required: true, unique: true },
    endDateTime: { type: Date, required: true }
}, { timestamps: true, collection: 'schedules' });

const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);
export default TimeSlot;
