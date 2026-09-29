import React from 'react';
import moment from 'moment';

const PrescriptionDetails = ({ data }) => {
  return (
    <div className="row" style={{ marginBottom: "2rem" }}>
      {/* Doctor Info */}
      <div className="col-md-6 mb-4 mb-md-0">
        <div style={{ padding: "1.25rem", backgroundColor: "#f8fafc", borderRadius: "12px", height: "100%", border: "1px solid #cbd5e1" }}>
          <h5 style={{ color: "#1e293b", fontWeight: "700", marginBottom: "8px" }}>Dr. {data?.doctor?.firstName + ' ' + data?.doctor?.lastName}</h5>
          <p style={{ margin: "2px 0", color: "#475569", fontSize: "13px", fontWeight: "600" }}>{data?.doctor?.designation}</p>
          <p style={{ margin: "2px 0", color: "#64748b", fontSize: "13px" }}>{data?.doctor?.college}</p>
          <p style={{ margin: "8px 0 0 0", color: "#94a3b8", fontSize: "12px", borderTop: "1px solid #e2e8f0", paddingTop: "8px" }}>
            📍 {data?.doctor?.address}, {data?.doctor?.state}, {data?.doctor?.country}
          </p>
        </div>
      </div>

      {/* Patient Info */}
      <div className="col-md-6">
        <div style={{ padding: "1.25rem", backgroundColor: "#f8fafc", borderRadius: "12px", height: "100%", border: "1px solid #cbd5e1" }}>
          <h5 style={{ color: "#475569", fontWeight: "700", marginBottom: "8px" }}>Patient Information</h5>
          <p style={{ margin: "2px 0", color: "#0f172a", fontSize: "14px", fontWeight: "600" }}>{data?.patient?.firstName + ' ' + data?.patient?.lastName}</p>
          <p style={{ margin: "4px 0", color: "#64748b", fontSize: "13px" }}>
            <strong>Sex:</strong> {data?.patient?.gender} &nbsp;|&nbsp; 
            <strong> Age:</strong> {data?.patient?.dateOfBirth ? moment().diff(data?.patient?.dateOfBirth, 'years') : 'N/A'} yrs &nbsp;|&nbsp; 
            <strong> Weight:</strong> {data?.patient?.weight || "N/A"} kg
          </p>
          <p style={{ margin: "8px 0 0 0", color: "#94a3b8", fontSize: "12px", borderTop: "1px solid #e2e8f0", paddingTop: "8px" }}>
            🏠 {data?.patient?.address}, {data?.patient?.city}, {data?.patient?.country}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetails;
