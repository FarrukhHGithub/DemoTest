import React from 'react';
import { Table } from "antd";
import moment from "moment";

const RxSection = ({ data, columns }) => {
  return (
    <div className="row" style={{ borderTop: "1px solid #e2e8f0", paddingTop: "1.5rem" }}>
      {/* Clinical side details */}
      <div className="col-md-4 mb-4 mb-md-0" style={{ borderRight: "1px solid #f1f5f9", paddingRight: "1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {data?.disease && (
            <div>
              <h6 style={{ color: "#1890ff", fontWeight: "700", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>Symptoms</h6>
              <p style={{ color: "#334155", fontSize: "13.5px", margin: 0, lineHeight: "1.5" }}>{data?.disease}</p>
            </div>
          )}
          {data?.daignosis && (
            <div>
              <h6 style={{ color: "#1890ff", fontWeight: "700", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>Diagnosis</h6>
              <p style={{ color: "#334155", fontSize: "13.5px", margin: 0, lineHeight: "1.5" }}>{data?.daignosis}</p>
            </div>
          )}
          {data?.test && (
            <div>
              <h6 style={{ color: "#1890ff", fontWeight: "700", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>Recommended Tests</h6>
              <p style={{ color: "#334155", fontSize: "13.5px", margin: 0, lineHeight: "1.5" }}>{data?.test}</p>
            </div>
          )}
          {data?.followUpdate && (
            <div>
              <h6 style={{ color: "#1890ff", fontWeight: "700", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>Next Appointment</h6>
              <p style={{ color: "#334155", fontSize: "13px", margin: 0 }}>
                📅 {moment(data?.followUpdate).format('LL')} <br />
                ⏰ {moment(data?.followUpdate).format('LT')}
              </p>
            </div>
          )}
          {data?.instruction && (
            <div>
              <h6 style={{ color: "#1890ff", fontWeight: "700", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>Doctor's Advice</h6>
              <p style={{ color: "#334155", fontSize: "13.5px", margin: 0, lineHeight: "1.5" }}>{data?.instruction}</p>
            </div>
          )}
        </div>
      </div>

      {/* Rx section (Medicines) */}
      <div className="col-md-8">
        <div style={{ paddingLeft: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
            <span style={{ fontSize: "24px", fontWeight: "800", color: "#1890ff" }}>Rx</span>
            <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: "600", textTransform: "uppercase" }}>Medications</span>
          </div>
          <Table 
            columns={columns} 
            dataSource={data?.medicines} 
            pagination={false} 
            bordered={false} 
            style={{
              border: "1px solid #f1f5f9",
              borderRadius: "8px",
              overflow: "hidden"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RxSection;
