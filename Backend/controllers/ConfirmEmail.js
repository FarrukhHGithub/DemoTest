// controllers/ConfirmEmail.js

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.office365.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

const sendAppointmentConfirmationEmail = async (selectValue) => {
  try {
    const { name, email, appointmentDetails } = selectValue;

    const htmlContent = `
      <p>Hi ${name},</p>
      <p>Your appointment has been successfully scheduled.</p>
      <p>Here are the appointment details:</p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Appointment Details:</strong> ${appointmentDetails}</li>
      </ul>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Appointment Confirmation",
      html: htmlContent,
    });
    // console.log("Appointment confirmation email sent to patient successfully");
  } catch (error) {
    console.error("Error sending appointment confirmation email to patient:", error);
    throw new Error("Error sending appointment confirmation email to patient");
  }
};

const sendDoctorAppointmentEmail = async (selectValue) => {
  try {
    const { name, email, bloodGroup, emergencyContact, gender } = selectValue;

    const htmlContent = `
      <p>Hi Doctor,</p>
      <p>A new appointment has been scheduled.</p>
      <p>Here are the appointment details:</p>
      <ul>
        <li><strong>Patient Name:</strong> ${name}</li>
        <li><strong>Patient Email:</strong> ${email}</li>
        <li><strong>Patient bloodGroup:</strong> ${bloodGroup}</li>
        <li><strong>Patient emergencyContact:</strong> ${emergencyContact}</li>
        <li><strong>Patient gender:</strong> ${gender}</li>
      </ul>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CLINIC_NOTIFY_EMAIL || process.env.SMTP_USER,
      subject: "New Appointment Scheduled",
      html: htmlContent,
    });
    // console.log("Appointment notification email sent to doctor successfully");
  } catch (error) {
    console.error("Error sending appointment notification email to doctor:", error);
    throw new Error("Error sending appointment notification email to doctor");
  }
};

export { sendAppointmentConfirmationEmail, sendDoctorAppointmentEmail };
