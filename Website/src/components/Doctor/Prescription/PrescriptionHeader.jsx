import React from 'react';
import moment from 'moment';

const PrescriptionHeader = ({ data, logo }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #1890ff", paddingBottom: "1.5rem", marginBottom: "2rem" }}>
      <div>
        <img src={logo} alt="Clinic Logo" style={{ height: "50px", objectFit: "contain" }} />
      </div>
      <div style={{ textAlign: "right" }}>
        <h4 style={{ color: "#1890ff", fontWeight: "700", margin: 0, textTransform: "uppercase", letterSpacing: "1px" }}>Prescription</h4>
        <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "13px" }}>
          <strong>Tracking ID:</strong> <span style={{ color: "#0f172a", fontWeight: "600" }}>{data?.appointment?.trackingId}</span><br />
          <strong>Issued Date:</strong> <span style={{ color: "#0f172a", fontWeight: "600" }}>{moment(data?.createdAt).format('LL')}</span>
        </p>
      </div>
    </div>
  );
};

export default PrescriptionHeader;
