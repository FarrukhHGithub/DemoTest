// utils/emailUtil.js

import nodemailer from 'nodemailer';
export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
export const sendEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'OTP for Verification',
            text: `Your OTP for verification is: ${otp}`
        });

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};
export const verifyOTP = (enteredOTP, generatedOTP) => {
    return enteredOTP === generatedOTP;
};
