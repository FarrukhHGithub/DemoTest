// import express from 'express';
// import dotenv from 'dotenv';
// import axios from 'axios';
// import connectToDatabase from './db.js';
// import passport from './googleOAuth.js';
// import authRoute from './routes/auth.js';
// import patientRoute from './routes/patientRoutes.js';
// import appointmentRoutes from './routes/appointmentRoutes.js';
// import medicalRecordRoutes from './routes/medicalReport.js';
// import invoiceRoutes from './routes/invoiceRoutes.js';
// import paymentRoutes from './routes/paymentRoutes.js';
// import otpDashRoutes from './routes/dashOtpRoutes.js';
// import healthInformationRoutes from './routes/healthInfoRoutes.js';
// import servicesRoute from './routes/services.js';
// import sandGridRoutes from './routes/sendgridRoutes.js';
// import medicineRoute from './routes/medicineRoutes.js';
// import doctorRoutes from './routes/doctor.js';
// import userauth from './routes/userauth.js';
// import schduleRoutes from './routes/schdule.js';
// import webAppointmentRoutes from './routes/webApoint.js';
// import emailCampaignRoutes from './routes/emailCampaignRoutes.js';
// import { authenticate } from './utils/authMiddleware.js';
// import { upload, uploads } from './utils/multerConfig.js';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import path from 'path';
// import cors from 'cors';
// import otpRoutes from './routes/Opt.js';
// import stripe from './routes/stripe.js';
// import webRoutes from './routes/webRoutes.js';
// import EmailSent from './routes/ConfirmEmail.js';
// import WebHistoryRoutes from './routes/WebHistoryRoutes.js';
// import historyRoutes from "./routes/historyRoutes.js";
// import dentalChartRoutes from './routes/dentalChartRoutes.js';
// import slotRoutes from './routes/slotRoutes.js';
// import './models/Slot/slotjob.js';
// import moment from 'moment-timezone';
// import Agenda from 'agenda';
// dotenv.config();

// const app = express();
// app.use(express.json());
// app.get('/', (req, res) => {
//     const port = process.env.PORT || 8000;

//     res.status(200).send(`
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <title>Backend Status</title>
//             <style>
//                 body {
//                     margin: 0;
//                     height: 100vh;
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                     background-color: #f7f9fc;
//                     font-family: Arial, Helvetica, sans-serif;
//                 }
//                 .container {
//                     text-align: center;
//                 }
//                 h1 {
//                     color: #2c3e50;
//                     margin-bottom: 10px;
//                 }
//                 p {
//                     color: #555;
//                     margin: 5px 0;
//                     font-size: 16px;
//                 }
//             </style>
//         </head>
//         <body>
//             <div class="container">
//                 <h1>Welcome To Avicena Healtcare Backend</h1>
//                 <h3> Avicena Backend API is Running Fine🚀</h3>
//             </div>
//         </body>
//         </html>
//     `);
// });


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// // console.log('MongoDB URI:', process.env.MONGO_URL);
// const getSlotsForSpecificPeriod = (timeRanges, duration, maxSlots, dayLabel, existingCount) => {
//     const slots = [];
//     const now = moment().utc();
//     const targetDay = now.clone().startOf('day');

//     if (dayLabel === 'tomorrow') {
//         targetDay.add(1, 'day');
//     }

//     let slotCount = existingCount;

//     for (const { startHour, startMinute, endHour, endMinute } of timeRanges) {
//         if (slotCount >= maxSlots) break; // Stop if limit reached

//         let startTime = targetDay.clone().set({ hour: startHour, minute: startMinute, second: 0, millisecond: 0 });
//         let endTime = targetDay.clone().set({ hour: endHour, minute: endMinute, second: 0, millisecond: 0 });

//         while (startTime.isBefore(endTime) && slotCount < maxSlots) {
//             const endSlotTime = startTime.clone().add(duration, 'minutes');
//             if (endSlotTime.isAfter(endTime)) break;
//             if (endSlotTime.isAfter(now)) {
//                 slots.push({
//                     start: startTime.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
//                     end: endSlotTime.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
//                     day: dayLabel
//                 });
//                 slotCount++;
//             }
//             startTime = endSlotTime;
//         }
//     }

//     // console.log(`Generated ${slots.length} Slots for ${dayLabel}:`, slots);
//     return slots;
// };
// const agenda = new Agenda({ db: { address: process.env.MONGO_URL, collection: 'jobs' } });
// const CLINIC_TIMEZONE = "Asia/Karachi";
// const SLOT_DURATION = 20;
// const WEEKDAY_START = 13; // 1:00 PM
// const WEEKDAY_END = 20;   // 8:00 PM
// const WEEKEND_START = 20; // 8:00 PM
// const WEEKEND_END = 24;   // 12:00 AM (midnight, next day)

// agenda.define("create slots", async () => {
//     try {
//         const response = await axios.get("https://api.avicenahealthcare.com/api/schedule");
//         const existingSlots = response.data || [];

//         const existingSlotSet = new Set(
//             existingSlots.map(slot => moment.utc(slot.startDateTime).valueOf())
//         );

//         const isWeekend = (date) => date.isoWeekday() >= 6; // Sat(6) / Sun(7)

//         const today = moment.tz(CLINIC_TIMEZONE).startOf("day");
//         const tomorrow = moment.tz(CLINIC_TIMEZONE).add(1, "day").startOf("day");

//         // // 🔍 DEBUG: confirm which branch each day actually takes
//         // console.log(`📅 Today: ${today.format('dddd, YYYY-MM-DD')} (${CLINIC_TIMEZONE}) → ${isWeekend(today) ? 'WEEKEND' : 'WEEKDAY'} hours`);
//         // console.log(`📅 Tomorrow: ${tomorrow.format('dddd, YYYY-MM-DD')} (${CLINIC_TIMEZONE}) → ${isWeekend(tomorrow) ? 'WEEKEND' : 'WEEKDAY'} hours`);

//         const buildSlots = (date, startHour, endHour) => {
//             const slots = [];
//             const now = moment.utc();
//             const dateStr = date.format('YYYY-MM-DD');

//             const dayStart = moment.tz(dateStr, "YYYY-MM-DD", CLINIC_TIMEZONE);

//             let current = dayStart.clone()
//                 .hour(startHour).minute(0).second(0).millisecond(0);

//             let end = endHour === 24
//                 ? dayStart.clone().add(1, "day").hour(0).minute(0).second(0).millisecond(0)
//                 : dayStart.clone().hour(endHour).minute(0).second(0).millisecond(0);

//             // 🔍 DEBUG: show the exact clinic-local and UTC window being generated
//             console.log(`   ↳ Window: ${current.format('YYYY-MM-DD HH:mm')} → ${end.format('YYYY-MM-DD HH:mm')} (${CLINIC_TIMEZONE}) | UTC: ${current.clone().utc().format('HH:mm')} → ${end.clone().utc().format('HH:mm')}`);

//             while (current.clone().add(SLOT_DURATION, "minutes").isSameOrBefore(end)) {
//                 const slotStart = current.clone();
//                 const slotEnd = current.clone().add(SLOT_DURATION, "minutes");

//                 if (slotStart.clone().utc().isAfter(now)) {
//                     slots.push({
//                         start: slotStart.clone().utc().toISOString(),
//                         end: slotEnd.clone().utc().toISOString(),
//                     });
//                 }

//                 current.add(SLOT_DURATION, "minutes");
//             }

//             return slots;
//         };

//         const todaySlots = isWeekend(today)
//             ? buildSlots(today, WEEKEND_START, WEEKEND_END)
//             : buildSlots(today, WEEKDAY_START, WEEKDAY_END);

//         const tomorrowSlots = isWeekend(tomorrow)
//             ? buildSlots(tomorrow, WEEKEND_START, WEEKEND_END)
//             : buildSlots(tomorrow, WEEKDAY_START, WEEKDAY_END);

//         const allNewSlots = [...todaySlots, ...tomorrowSlots];

//         const slotsToCreate = allNewSlots.filter(
//             slot => !existingSlotSet.has(moment.utc(slot.start).valueOf())
//         );

//         for (const slot of slotsToCreate) {
//             await axios.post("https://api.avicenahealthcare.com/api/schedule/create", {
//                 startDateTime: slot.start,
//                 endDateTime: slot.end,
//             });
//             console.log("✅ Created slot (UTC):", slot.start);
//         }

//         console.log("🎯 Slot generation completed successfully");

//     } catch (error) {
//         console.error("❌ Error creating slots:", error);
//     }
// });

// agenda.define('fetch slots', async () => {
//     // console.log('Fetching slots...');
//     try {
//         const response = await axios.get(`https://api.avicenahealthcare.com/api/schedule/`);
//         // console.log(`✅ Fetched ${response.data.length} slots`);
//     } catch (error) {
//         console.error('❌ Error fetching slots:', error);
//     }
// });
// agenda.define('delete past slots', async () => {
//     // console.log('Deleting past slots...');
//     const now = moment().utc();
//     try {
//         const response = await axios.delete('https://api.avicenahealthcare.com/api/schedule/past', {
//             data: { now: now.toISOString() }
//         });
//         // console.log(`✅ Past slots deleted: ${response.data.removedCount}`);
//     } catch (error) {
//         console.error('❌ Error deleting past slots:', error);
//     }
// });
// agenda.on('ready', async () => {
//     try {
//         await agenda.every('*/1 * * * *', 'create slots');  // Runs every 1 minute
//         await agenda.every('*/15 * * * *', 'fetch slots'); // Runs every 15 minutes
//         await agenda.every('*/1 * * * *', 'delete past slots');
//         await agenda.start();
//         // console.log('✅ All jobs scheduled and Agenda started.');
//     } catch (error) {
//         console.error('❌ Error scheduling jobs with Agenda:', error);
//     }
// });
// connectToDatabase().then(() => {
//     // console.log('Database connection successful');
// }).catch(error => {
//     console.error('Database connection error:', error);
// });
// app.use('/uploads', setCors, express.static(path.join(__dirname, 'uploads')));
// function setCors(req, res, next) {
//     const allowedOrigins = ['https://admin.avicenahealthcare.com', 'https://www.avicenahealthcare.com', 'http://localhost:5173', 'http://localhost:5174', 'https://www.avicenahealthcare.com/api', 'https://api.avicenahealthcare.com', 'http://api.avicenahealthcare.com', 'http://www.avicenahealthcare.com/api'];

//     const origin = req.headers.origin;
//     if (allowedOrigins.includes(origin)) {
//         res.setHeader('Access-Control-Allow-Origin', origin);
//     }
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// }
// app.use((req, res, next) => {
//     res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
//     next();
// });

// const corsOptions = {
//     origin: ['https://admin.avicenahealthcare.com', 'https://www.avicenahealthcare.com', 'https://api.avicenahealthcare.com', 'http://api.avicenahealthcare.com', 'https://www.avicenahealthcare.com/api', 'http://localhost:5173', 'http://localhost:5174'],
//     credentials: true,
// };

// app.use(cors(corsOptions));
// app.post('/api/upload', upload.single('file'), (req, res) => {
//     const file = req.file;
//     res.json({ imageUrl: '/uploads/' + file.filename });
// });

// app.use('/api/medical-records', uploads, medicalRecordRoutes);

// // Google OAuth routes
// app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// app.get('/api/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
//     res.redirect('https://www.avicenahealthcare.com');
// });
// app.use((req, res, next) => {
//     res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
//     next();
// });
// app.use('/api/auth', authRoute);
// app.use('/api/userauth', userauth);
// app.use('/api/patients', authenticate, patientRoute);
// app.use('/api/appointments', authenticate, appointmentRoutes);
// app.use('/api/medical-records', authenticate, medicalRecordRoutes);
// app.use('/api/invoices', authenticate, invoiceRoutes);
// app.use('/api/payments', authenticate, paymentRoutes);
// app.use('/api/health-information', authenticate, healthInformationRoutes);
// app.use('/api/services', authenticate, servicesRoute);
// app.use('/api/sandgrid', authenticate, sandGridRoutes);
// app.use('/api/medicine', authenticate, medicineRoute);
// app.use('/api/doctors', authenticate, doctorRoutes);
// app.use('/api/web', authenticate, webRoutes);
// app.use('/api/v1', authenticate, webAppointmentRoutes);
// app.use('/api/otps', authenticate, otpDashRoutes);
// app.use('/api/otp', otpRoutes);
// app.use('/api/stripe', authenticate, stripe);
// app.use('/api/', emailCampaignRoutes);
// app.use('/api/', EmailSent);
// app.use('/api/dental-chart', authenticate, dentalChartRoutes);
// app.use('/api/schedule', schduleRoutes);
// app.use('/api/slot', slotRoutes);
// app.use("/api/patient-history", historyRoutes);
// app.use("/api/web-history", WebHistoryRoutes);

// const PORT = process.env.PORT || 8800;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
















import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import connectToDatabase from './db.js';
import passport from './googleOAuth.js';
import authRoute from './routes/auth.js';
import patientRoute from './routes/patientRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import medicalRecordRoutes from './routes/medicalReport.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import otpDashRoutes from './routes/dashOtpRoutes.js';
import healthInformationRoutes from './routes/healthInfoRoutes.js';
import servicesRoute from './routes/services.js';
import sandGridRoutes from './routes/sendgridRoutes.js';
import medicineRoute from './routes/medicineRoutes.js';
import doctorRoutes from './routes/doctor.js';
import userauth from './routes/userauth.js';
import schduleRoutes from './routes/schdule.js';
import webAppointmentRoutes from './routes/webApoint.js';
import emailCampaignRoutes from './routes/emailCampaignRoutes.js';
import { authenticate } from './utils/authMiddleware.js';
import { upload, uploads } from './utils/multerConfig.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import cors from 'cors';
import otpRoutes from './routes/Opt.js';
import stripe from './routes/stripe.js';
import webRoutes from './routes/webRoutes.js';
import EmailSent from './routes/ConfirmEmail.js';
import historyRoutes from "./routes/historyRoutes.js";
import dentalChartRoutes from './routes/dentalChartRoutes.js';
import WebHistoryRoutes from './routes/WebHistoryRoutes.js';
import slotRoutes from './routes/slotRoutes.js';
import { generateSlotsForRange } from './controllers/slotController.js';
import TimeSlot from './models/Slot/Slot.js';
import moment from 'moment-timezone';
import Agenda from 'agenda';
dotenv.config();

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    const port = process.env.PORT || 8800;

    res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Backend Status</title>
            <style>
                body {
                    margin: 0;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #f7f9fc;
                    font-family: Arial, Helvetica, sans-serif;
                }
                .container {
                    text-align: center;
                }
                h1 {
                    color: #2c3e50;
                    margin-bottom: 10px;
                }
                p {
                    color: #555;
                    margin: 5px 0;
                    font-size: 16px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Backend API is Running 🚀</h1>
                <p>Status: <strong>OK</strong></p>
                <p>Port: <strong>${port}</strong></p>
            </div>
        </body>
        </html>
    `);
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// console.log('MongoDB URI:', process.env.MONGO_URL);
const getSlotsForSpecificPeriod = (timeRanges, duration, maxSlots, dayLabel, existingCount) => {
    // console.log(`Generating slots for ${dayLabel}...`);
    const slots = [];
    const now = moment().utc();
    const targetDay = now.clone().startOf('day');

    if (dayLabel === 'tomorrow') {
        targetDay.add(1, 'day');
    }

    let slotCount = existingCount;

    for (const { startHour, startMinute, endHour, endMinute } of timeRanges) {
        if (slotCount >= maxSlots) break; // Stop if limit reached

        let startTime = targetDay.clone().set({ hour: startHour, minute: startMinute, second: 0, millisecond: 0 });
        let endTime = targetDay.clone().set({ hour: endHour, minute: endMinute, second: 0, millisecond: 0 });

        while (startTime.isBefore(endTime) && slotCount < maxSlots) {
            const endSlotTime = startTime.clone().add(duration, 'minutes');
            if (endSlotTime.isAfter(endTime)) break;
            if (endSlotTime.isAfter(now)) {
                slots.push({
                    start: startTime.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                    end: endSlotTime.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                    day: dayLabel
                });
                slotCount++;
            }
            startTime = endSlotTime;
        }
    }

    return slots;
};
const agenda = new Agenda({ db: { address: "mongodb+srv://FarrukhBalay:FarrukhBalay@cluster0.kqaf8ub.mongodb.net/", collection: 'jobs' } });
const CLINIC_TIMEZONE = "Asia/Karachi";
const SLOT_DURATION = 20; // minutes

// Fixed clinic working hours (in CLINIC_TIMEZONE, NOT UK time)
const WEEKDAY_START = 13; // 1:00 PM
const WEEKDAY_END = 20;   // 8:00 PM
const WEEKEND_START = 20; // 8:00 PM
const WEEKEND_END = 24;

agenda.define("create slots", async () => {
    try {
        // Generate both weekday and weekend slots at once for the next 7 days, stored in MongoDB
        const result = await generateSlotsForRange(7);
        if (result.createdCount > 0) {
            console.log(`🎯 Slot generation completed: created ${result.createdCount} new slots`);
        }
    } catch (error) {
        console.error("❌ Error creating slots:", error);
    }
});
agenda.define('fetch slots', async () => {
    try {
        const count = await TimeSlot.countDocuments();
        console.log(`🎯 Active slots in DB: ${count}`);
    } catch (error) {
        console.error('❌ Error fetching slots:', error);
    }
});
agenda.define('delete past slots', async () => {
    try {
        const now = moment().utc().toDate();
        const result = await TimeSlot.deleteMany({
            endDateTime: { $lt: now }
        });
        if (result.deletedCount > 0) {
            console.log(`✅ Past slots deleted: ${result.deletedCount}`);
        }
    } catch (error) {
        console.error('❌ Error deleting past slots:', error);
    }
});
// Agenda cron jobs only run when the server has a persistent process (local dev / traditional hosting).
// On Vercel serverless, functions are short-lived — use Vercel Cron Jobs or an external scheduler instead.
if (process.env.NODE_ENV !== 'production') {
    agenda.on('ready', async () => {
        try {
            await agenda.every('*/1 * * * *', 'create slots');
            await agenda.every('*/1 * * * *', 'fetch slots'); // Runs every 15 minutes
            await agenda.every('*/1 * * * *', 'delete past slots');
            await agenda.start();
            // console.log('✅ All jobs scheduled and Agenda started.');
        } catch (error) {
            console.error('❌ Error scheduling jobs with Agenda:', error);
        }
    });
}
// Initiate the DB connection eagerly so it is cached for warm serverless invocations.
connectToDatabase().catch(error => {
    console.error('Database connection error:', error);
});
// Static file serving for uploads/ only works when running locally.
// On Vercel, the filesystem is read-only — serve uploaded files from
// cloud storage (AWS S3, Cloudinary, etc.) instead.
if (process.env.NODE_ENV !== 'production') {
    app.use('/uploads', setCors, express.static(path.join(__dirname, 'uploads')));
}
function setCors(req, res, next) {
    // Read allowed origins from env; fall back to the production domains.
    const envOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',').map(o => o.trim()) : [];
    const allowedOrigins = [
        ...envOrigins,
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:8800',
        'https://demo-test-dashboard.vercel.app/',
        'https://demo-testing-cyan.vercel.app/',
        'https://demo-backend-deicioz4v-bussinessguy5909-1689s-projects.vercel.app/'
    ].filter(Boolean);

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
});

// Build CORS origin list from env variable (comma-separated) + local dev origins.
const envCorsOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',').map(o => o.trim()) : [];
const corsOptions = {
    origin: [
        ...envCorsOrigins,
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:8800',
        'https://demo-test-dashboard.vercel.app/',
        'https://demo-testing-cyan.vercel.app/',
        'https://demo-backend-deicioz4v-bussinessguy5909-1689s-projects.vercel.app/',
    ].filter(Boolean),
    credentials: true,
};

app.use(cors(corsOptions));
app.post('/api/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    res.json({ imageUrl: '/uploads/' + file.filename });
});

app.use('/api/medical-records', uploads, medicalRecordRoutes);

// Google OAuth routes
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/api/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect(process.env.GOOGLE_OAUTH_SUCCESS_REDIRECT);
});
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
});
app.use('/api/auth', authRoute);
app.use('/api/userauth', userauth);
app.use('/api/patients', authenticate, patientRoute);
app.use('/api/appointments', authenticate, appointmentRoutes);
app.use('/api/medical-records', authenticate, medicalRecordRoutes);
app.use('/api/invoices', authenticate, invoiceRoutes);
app.use('/api/payments', authenticate, paymentRoutes);
app.use('/api/health-information', authenticate, healthInformationRoutes);
app.use('/api/services', authenticate, servicesRoute);
app.use('/api/sandgrid', authenticate, sandGridRoutes);
app.use('/api/medicine', authenticate, medicineRoute);
app.use('/api/doctors', authenticate, doctorRoutes);
app.use('/api/web', authenticate, webRoutes);
app.use('/api/v1', authenticate, webAppointmentRoutes);
app.use('/api/otps', authenticate, otpDashRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/stripe', authenticate, stripe);
app.use('/api/', emailCampaignRoutes);
app.use('/api/', EmailSent);
app.use('/api/dental-chart', authenticate, dentalChartRoutes);
app.use('/api/schedule', schduleRoutes);
app.use('/api/slot', slotRoutes);

app.use("/api/patient-history", historyRoutes);
app.use("/api/web-history", WebHistoryRoutes);

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 8800;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;