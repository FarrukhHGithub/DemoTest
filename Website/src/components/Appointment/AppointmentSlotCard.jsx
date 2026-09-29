import React, { memo } from "react";
import { Typography } from "antd";
import { CheckOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { convertUtcToTimezone } from "../../utils/timezone.js";

const { Text } = Typography;

const AppointmentSlotCard = memo(({
  slot,
  isSelected,
  isFirst,
  selectedTimezone,
  localTimezone,
  handleSlotSelection,
}) => {
  const startTime = convertUtcToTimezone(slot.startDateTime, selectedTimezone);
  const endTime = convertUtcToTimezone(slot.endDateTime, selectedTimezone);

  return (
    <div
      id={isFirst ? "tour-first-slot-card" : undefined}
      className={isSelected ? "slot-card-selected" : "slot-card"}
      onClick={() => handleSlotSelection(slot)}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
    >
      {/* Time Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2px", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <ClockCircleOutlined style={{ fontSize: "13px", color: isSelected ? "#2563eb" : "#64748b" }} />
            <Text
              strong
              style={{
                fontSize: "14px",
                color: isSelected ? "#1e40af" : "#0f172a",
                fontWeight: "700",
                lineHeight: 1.25,
              }}
            >
              {startTime}
            </Text>
          </div>
          <Text
            type="secondary"
            style={{
              fontSize: "11px",
              color: isSelected ? "#2563eb" : "#64748b",
              whiteSpace: "nowrap",
            }}
          >
            to {endTime}
          </Text>
        </div>

        {/* Alternate Timezones Section */}
        {(selectedTimezone !== localTimezone || selectedTimezone !== "Europe/London") && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "4px",
              marginTop: "2px",
            }}
          >
            {selectedTimezone !== localTimezone && (
              <span className="timezone-badge">
                🏠 {convertUtcToTimezone(slot.startDateTime, localTimezone)}
              </span>
            )}
            {selectedTimezone !== "Europe/London" && (
              <span className="timezone-badge">
                🇬🇧 {convertUtcToTimezone(slot.startDateTime, "Europe/London")}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Select Status Pill */}
      <div className="slot-select-status">
        {isSelected ? (
          <>
            <CheckOutlined style={{ fontSize: "11px" }} />
            <span>Selected</span>
          </>
        ) : (
          <span>Select Slot</span>
        )}
      </div>
    </div>
  );
});

AppointmentSlotCard.displayName = "AppointmentSlotCard";

export default AppointmentSlotCard;
