import TimeSlot from '../models/Slot/Slot.js';
import moment from 'moment-timezone';

const CLINIC_TIMEZONE = "Asia/Karachi";
const SLOT_DURATION = 20; // minutes
const WEEKDAY_START = 13; // 1:00 PM
const WEEKDAY_END = 20;   // 8:00 PM
const WEEKEND_START = 20; // 8:00 PM
const WEEKEND_END = 24;   // 12:00 AM (midnight)

// Helper to build slots for a single day based on hours
const buildSlots = (date, startHour, endHour) => {
    const slots = [];
    const now = moment.utc();
    const dateStr = date.format('YYYY-MM-DD');

    const dayStart = moment.tz(dateStr, "YYYY-MM-DD", CLINIC_TIMEZONE);

    let current = dayStart.clone()
        .hour(startHour).minute(0).second(0).millisecond(0);

    let end = endHour === 24
        ? dayStart.clone().add(1, "day").hour(0).minute(0).second(0).millisecond(0)
        : dayStart.clone().hour(endHour).minute(0).second(0).millisecond(0);

    console.log(`   ↳ Window: ${current.format('YYYY-MM-DD HH:mm')} → ${end.format('YYYY-MM-DD HH:mm')} (${CLINIC_TIMEZONE}) | UTC: ${current.clone().utc().format('HH:mm')} → ${end.clone().utc().format('HH:mm')}`);

    while (current.clone().add(SLOT_DURATION, "minutes").isSameOrBefore(end)) {
        const slotStart = current.clone();
        const slotEnd = current.clone().add(SLOT_DURATION, "minutes");

        if (slotStart.clone().utc().isAfter(now)) {
            slots.push({
                startDateTime: slotStart.clone().utc().toDate(),
                endDateTime: slotEnd.clone().utc().toDate(),
            });
        }

        current.add(SLOT_DURATION, "minutes");
    }

    return slots;
};

// Core local helper to generate slots for a range of days
export const generateSlotsForRange = async (daysCount = 7) => {
    const isWeekend = (date) => date.isoWeekday() >= 6; // Sat(6) / Sun(7)
    const today = moment.tz(CLINIC_TIMEZONE).startOf("day");

    let allNewSlots = [];

    for (let i = 0; i < daysCount; i++) {
        const targetDay = today.clone().add(i, 'days');
        const daySlots = isWeekend(targetDay)
            ? buildSlots(targetDay, WEEKEND_START, WEEKEND_END)
            : buildSlots(targetDay, WEEKDAY_START, WEEKDAY_END);
        allNewSlots.push(...daySlots);
    }

    if (allNewSlots.length === 0) {
        return { createdCount: 0, slots: [] };
    }

    // Get existing slots in the range to avoid duplication
    const startRange = today.clone().utc().toDate();
    const endRange = today.clone().add(daysCount, 'days').utc().toDate();

    const existingSlots = await TimeSlot.find({
        startDateTime: { $gte: startRange, $lte: endRange }
    }).select('startDateTime');

    const existingSlotSet = new Set(
        existingSlots.map(slot => slot.startDateTime.getTime())
    );

    const slotsToCreate = allNewSlots.filter(
        slot => !existingSlotSet.has(slot.startDateTime.getTime())
    );

    if (slotsToCreate.length > 0) {
        // Use insertMany to store slots at one time (bulk operation)
        const newSlots = await TimeSlot.insertMany(slotsToCreate, { ordered: false }).catch(err => {
            // In case of duplicate key errors (parallel requests), return successfully created ones
            if (err.writeErrors) {
                return err.insertedDocs || [];
            }
            throw err;
        });
        return { createdCount: newSlots.length, slots: newSlots };
    }

    return { createdCount: 0, slots: [] };
};

// Controller handlers
export const getAllSlots = async (req, res) => {
    try {
        const slots = await TimeSlot.find().sort({ startDateTime: 1 });
        res.status(200).json(slots);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const generateSlotsHandler = async (req, res) => {
    const daysCount = parseInt(req.body.daysCount, 10) || 7;
    try {
        const result = await generateSlotsForRange(daysCount);
        res.status(201).json({
            message: `Slots generation completed successfully`,
            createdCount: result.createdCount,
            slots: result.slots
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteSlot = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSlot = await TimeSlot.findByIdAndDelete(id);
        if (!deletedSlot) {
            return res.status(404).json({ message: 'Slot not found' });
        }
        res.status(200).json(deletedSlot);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePastSlots = async (req, res) => {
    try {
        const now = moment().utc().toDate();
        const result = await TimeSlot.deleteMany({
            endDateTime: { $lt: now }
        });
        res.status(200).json({
            message: 'Past slots removed successfully',
            removedCount: result.deletedCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
