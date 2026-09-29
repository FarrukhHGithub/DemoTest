import React from 'react';
import { FaLocationArrow, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
        borderRadius: "16px",
        padding: "2.5rem 2rem",
        color: "#ffffff",
        height: "100%",
        boxShadow: "0 8px 30px rgba(30, 58, 138, 0.15)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "2rem"
      }}
    >
      <div>
        <h3 style={{ color: "#ffffff", fontWeight: "700", marginBottom: "1rem" }}>Contact Details</h3>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", lineHeight: "1.6" }}>
          Reach out to us directly via phone, email, or visit our clinic. Our staff is ready to assist you.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "50%" }}>
            <FaLocationArrow style={{ fontSize: "18px", color: "#60a5fa" }} />
          </div>
          <div>
            <h5 style={{ color: "#ffffff", margin: 0, fontSize: "15px", fontWeight: "600" }}>Location</h5>
            <p style={{ color: "rgba(255,255,255,0.85)", margin: 0, fontSize: "13px" }}>1212 UK 03214</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "50%" }}>
            <FaEnvelope style={{ fontSize: "18px", color: "#60a5fa" }} />
          </div>
          <div>
            <h5 style={{ color: "#ffffff", margin: 0, fontSize: "15px", fontWeight: "600" }}>Email</h5>
            <p style={{ color: "rgba(255,255,255,0.85)", margin: 0, fontSize: "13px" }}>fayyaz_sarwar@hotmail.com</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "50%" }}>
            <FaPhoneAlt style={{ fontSize: "18px", color: "#60a5fa" }} />
          </div>
          <div>
            <h5 style={{ color: "#ffffff", margin: 0, fontSize: "15px", fontWeight: "600" }}>Call</h5>
            <p style={{ color: "rgba(255,255,255,0.85)", margin: 0, fontSize: "13px" }}>+44 7579 389649</p>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "1.5rem" }}>
        <p style={{ color: "rgba(255,255,255,0.65)", margin: 0, fontSize: "12px" }}>
          Emergency assistance: 24/7 available at the clinic location.
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
