import React, { useState, useCallback } from "react";
import axios from 'axios';
import Header from "../Shared/Header/Header";
import SubHeader from "../Shared/SubHeader";
import Footer from "../Shared/Footer/Footer";
import BASE_URL from '../../baseUrl';
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

const Contact = () => {
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState(null);
  const [sendSuccess, setSendSuccess] = useState(false);

  const onSubmit = useCallback(async (data) => {
    setIsSending(true);
    setSendError(null);
    setSendSuccess(false);
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(`${BASE_URL}/api/userauth/send-email`, {
        email: data.email,
        subject: "New Contact Form Submission",
        body: `
          First Name: ${data.firstName}
          Last Name: ${data.lastName}
          Email: ${data.email}
          Subject: ${data.subject}
          Message: ${data.message}
        `,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setSendSuccess(true);
      } else {
        setSendError(response.data.error || "Error sending email");
      }
    } catch (error) {
      setSendError("Error sending email");
    } finally {
      setIsSending(false);
    }
  }, []);

  return (
    <>
      <Header />
      <SubHeader
        title="Contact Us"
        subtitle="We're here to help in any medical emergency or general inquiry."
      />
      <section id="contact" style={{ padding: "4rem 0", backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="row" style={{ alignItems: "stretch" }}>
            {/* Left Contact Info Section */}
            <div className="col-lg-4 mb-4 mb-lg-0">
              <ContactInfo />
            </div>

            {/* Right Contact Form Section */}
            <div className="col-lg-8">
              <ContactForm
                onSubmit={onSubmit}
                isSending={isSending}
                sendError={sendError}
                sendSuccess={sendSuccess}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;