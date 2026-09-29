import React from "react";
import { Tag } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";

const PatientInfoSection = ({ profileData, webPatientData }) => {
  const hasProfile = profileData && Object.keys(profileData).length > 0;
  const hasWebProfile = webPatientData && Object.keys(webPatientData).length > 0 && webPatientData.patientInfo;

  if (!hasProfile && !hasWebProfile) return null;

  const data = hasProfile ? profileData : webPatientData.patientInfo;

  return (
    <div className="patient-details-section">
      <h2 className="section-title">Patient Information</h2>

      <div className="patient-info-grid">
        {/* Full Name */}
        <div className="patient-info-item">
          <div className="patient-info-icon-wrapper">
            <UserOutlined />
          </div>
          <div className="patient-info-content">
            <span className="patient-info-label">Full Name</span>
            <span className="patient-info-value">{data.fullName || data.name || "N/A"}</span>
          </div>
        </div>

        {/* Gender */}
        <div className="patient-info-item">
          <div className="patient-info-icon-wrapper" style={{ backgroundColor: "#fef3c7", color: "#d97706" }}>
            {data.gender?.toLowerCase() === "female" ? <WomanOutlined /> : <ManOutlined />}
          </div>
          <div className="patient-info-content">
            <span className="patient-info-label">Gender</span>
            <div>
              <Tag
                color={
                  data.gender?.toLowerCase() === "female"
                    ? "magenta"
                    : data.gender?.toLowerCase() === "male"
                    ? "blue"
                    : "default"
                }
                style={{ borderRadius: "6px", fontWeight: "600", margin: 0 }}
              >
                {data.gender || "Not Specified"}
              </Tag>
            </div>
          </div>
        </div>

        {/* Blood Group */}
        <div className="patient-info-item">
          <div className="patient-info-icon-wrapper" style={{ backgroundColor: "#fee2e2", color: "#dc2626" }}>
            <HeartOutlined />
          </div>
          <div className="patient-info-content">
            <span className="patient-info-label">Blood Group</span>
            <div>
              <Tag color="volcano" style={{ borderRadius: "6px", fontWeight: "700", margin: 0 }}>
                {data.bloodGroup || "N/A"}
              </Tag>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="patient-info-item">
          <div className="patient-info-icon-wrapper" style={{ backgroundColor: "#f3e8ff", color: "#9333ea" }}>
            <MailOutlined />
          </div>
          <div className="patient-info-content">
            <span className="patient-info-label">Email Address</span>
            <span className="patient-info-value">{data.email || "N/A"}</span>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="patient-info-item">
          <div className="patient-info-icon-wrapper" style={{ backgroundColor: "#dcfce7", color: "#16a34a" }}>
            <PhoneOutlined />
          </div>
          <div className="patient-info-content">
            <span className="patient-info-label">Emergency Contact</span>
            <span className="patient-info-value">{data.emergencyContact || "N/A"}</span>
          </div>
        </div>

        {/* Address */}
        <div className="patient-info-item">
          <div className="patient-info-icon-wrapper" style={{ backgroundColor: "#e0f2fe", color: "#0284c7" }}>
            <EnvironmentOutlined />
          </div>
          <div className="patient-info-content">
            <span className="patient-info-label">Address</span>
            <span className="patient-info-value">{data.address || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfoSection;