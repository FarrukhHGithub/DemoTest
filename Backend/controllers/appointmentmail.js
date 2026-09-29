import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
const sendAppointmentConfirmationEmail = async (selectValue) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: selectValue.email,
      subject: "Appointment Confirmation",
      html: `<p>Your appointment has been successfully scheduled.</p>`,
    });
    console.log("Appointment confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending appointment confirmation email:", error);
    throw new Error("Error sending appointment confirmation email");
  }
};

export default sendAppointmentConfirmationEmail
