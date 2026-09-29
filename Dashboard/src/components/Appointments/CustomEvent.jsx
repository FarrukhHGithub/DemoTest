import React from "react";
import moment from "moment";

export const CustomEvent = ({ event }) => {
  return (
    <div
      style={{
        padding: "2px 4px",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          fontWeight: "600",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          color: "white",
        }}
      >
        {event.patientEmail || "No email"}
      </div>
      <div
        style={{
          fontSize: "8px",
          opacity: 0.9,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          color: "white",
        }}
      >
        {event.serviceName || "Appointment"}
      </div>
      <div
        style={{
          fontSize: "10px",
          opacity: 0.8,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          color: "white",
        }}
      >
        {moment(event.start).format("h:mm A")} -{" "}
        {moment(event.end).format("h:mm A")}
      </div>
    </div>
  );
};
