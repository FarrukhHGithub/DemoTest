import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import moment from "moment-timezone";
import { Typography, Button, Select } from "antd";
import { GlobalOutlined, CheckCircleFilled } from "@ant-design/icons";
import BASE_URL from "../../baseUrl.jsx";
import { convertUtcToTimezone } from "../../utils/timezone.js";
import AppointmentSlotCard from "./AppointmentSlotCard";
import "./SelectAppointment.css";

const { Title, Text } = Typography;

// Generate list of all available timezones once outside component render
const timezoneOptions = moment.tz.names().map((tzName) => ({
  label: `${tzName.replace(/_/g, " ")} (GMT${moment.tz(tzName).format("Z")})`,
  value: tzName,
}));

const SelectAppointment = ({ handleSelectAppointment, patientId }) => {
  const [appointmentSlots, setAppointmentSlots] = useState([]);
  const [selectedSlotObj, setSelectedSlotObj] = useState(null);
  const [selectedDayFilter, setSelectedDayFilter] = useState("today");

  // Detect local timezone & set display preference
  const localTimezone = useMemo(() => moment.tz.guess() || "Europe/London", []);
  const [selectedTimezone, setSelectedTimezone] = useState(localTimezone);

  const fetchAppointmentSlots = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/schedule/`);
      const allSlots = response.data;

      const uniqueSlotSet = new Set();
      const processedSlots = [];

      allSlots.forEach((slot) => {
        const startVal = moment.utc(slot.startDateTime).valueOf();
        const endVal = moment.utc(slot.endDateTime).valueOf();
        const slotKey = `${startVal}-${endVal}`;

        if (!uniqueSlotSet.has(slotKey)) {
          uniqueSlotSet.add(slotKey);
          processedSlots.push(slot);
        }
      });

      const sortedSlots = processedSlots.sort(
        (a, b) => moment.utc(a.startDateTime).valueOf() - moment.utc(b.startDateTime).valueOf()
      );

      setAppointmentSlots(sortedSlots);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  }, []);

  useEffect(() => {
    fetchAppointmentSlots();
  }, [fetchAppointmentSlots]);

  const handleSlotSelection = useCallback(
    (slot) => {
      setSelectedSlotObj(slot);
      handleSelectAppointment(slot, patientId);
    },
    [handleSelectAppointment, patientId]
  );

  const getSlotDateKey = useCallback(
    (slot) => {
      return convertUtcToTimezone(slot.startDateTime, selectedTimezone, "YYYY-MM-DD");
    },
    [selectedTimezone]
  );

  const todayStr = useMemo(() => moment().tz(selectedTimezone).format("YYYY-MM-DD"), [selectedTimezone]);
  const tomorrowStr = useMemo(
    () => moment().tz(selectedTimezone).add(1, "day").format("YYYY-MM-DD"),
    [selectedTimezone]
  );

  const hasSlotsForToday = useMemo(() => {
    return appointmentSlots.some((slot) => getSlotDateKey(slot) === todayStr);
  }, [appointmentSlots, getSlotDateKey, todayStr]);

  const hasSlotsForTomorrow = useMemo(() => {
    return appointmentSlots.some((slot) => getSlotDateKey(slot) === tomorrowStr);
  }, [appointmentSlots, getSlotDateKey, tomorrowStr]);

  // Auto-switch to tomorrow if today has no slots but tomorrow has slots
  useEffect(() => {
    if (!hasSlotsForToday && hasSlotsForTomorrow) {
      setSelectedDayFilter("tomorrow");
    } else if (hasSlotsForToday) {
      setSelectedDayFilter("today");
    }
  }, [hasSlotsForToday, hasSlotsForTomorrow]);

  const getButtonLabel = useCallback(
    (type) => {
      const targetDate = type === "today" ? todayStr : tomorrowStr;
      const firstSlot = appointmentSlots.find((slot) => getSlotDateKey(slot) === targetDate);

      if (firstSlot) {
        if (targetDate === todayStr) return "Today";
        if (targetDate === tomorrowStr) return "Tomorrow";
        return convertUtcToTimezone(firstSlot.startDateTime, selectedTimezone, "ddd, MMM DD");
      }

      return type === "today" ? "Today" : "Tomorrow";
    },
    [appointmentSlots, getSlotDateKey, todayStr, tomorrowStr, selectedTimezone]
  );

  // Group slots for rendering based on selected day tab
  const groupedSlots = useMemo(() => {
    const groups = {};
    const targetDate = selectedDayFilter === "today" ? todayStr : tomorrowStr;

    appointmentSlots.forEach((slot) => {
      const dateKey = getSlotDateKey(slot);
      if (dateKey !== targetDate) return;

      if (!groups[dateKey]) {
        groups[dateKey] = { slots: [] };
      }
      groups[dateKey].slots.push(slot);
    });

    Object.keys(groups).forEach((dateKey) => {
      const firstSlot = groups[dateKey].slots[0];
      if (firstSlot) {
        let displayDate;
        if (dateKey === todayStr) {
          displayDate = `Today (${convertUtcToTimezone(firstSlot.startDateTime, selectedTimezone, "dddd, MMM DD")})`;
        } else if (dateKey === tomorrowStr) {
          displayDate = `Tomorrow (${convertUtcToTimezone(firstSlot.startDateTime, selectedTimezone, "dddd, MMM DD")})`;
        } else {
          displayDate = convertUtcToTimezone(firstSlot.startDateTime, selectedTimezone, "dddd, MMMM DD, YYYY");
        }
        groups[dateKey].displayDate = displayDate;
      }
    });

    return Object.fromEntries(
      Object.entries(groups).sort(
        ([a], [b]) => moment.tz(a, selectedTimezone).valueOf() - moment.tz(b, selectedTimezone).valueOf()
      )
    );
  }, [appointmentSlots, selectedDayFilter, todayStr, tomorrowStr, getSlotDateKey, selectedTimezone]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "960px",
        margin: "0.5rem auto",
        padding: "1.25rem 1.5rem",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 8px 30px rgba(15, 23, 42, 0.04)",
        border: "1px solid #f1f5f9",
      }}
    >
      {/* Header Section */}
      <div style={{ marginBottom: "1rem", textAlign: "center" }}>
        <Title level={3} style={{ color: "#0f172a", marginBottom: "3px", fontWeight: "700", fontSize: "20px" }}>
          Select Appointment Slot
        </Title>
        <Text type="secondary" style={{ fontSize: "13px", color: "#64748b" }}>
          Choose a convenient date and time to book your virtual consultation.
        </Text>
      </div>

      {/* Control Bar: Day Tabs & Timezone Selector */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
          padding: "0.5rem 0.85rem",
          backgroundColor: "#f8fafc",
          borderRadius: "12px",
          marginBottom: "0.85rem",
          border: "1px solid #e2e8f0",
        }}
      >
        {/* Segmented Day Tabs */}
        <div
          id="tour-appointment-days"
          style={{
            display: "flex",
            gap: "0.3rem",
            backgroundColor: "#e2e8f0",
            padding: "3px",
            borderRadius: "8px",
          }}
        >
          <Button
            type="text"
            size="small"
            className="segmented-btn"
            style={{
              backgroundColor: selectedDayFilter === "today" ? "#ffffff" : "transparent",
              color: selectedDayFilter === "today" ? "#2563eb" : "#64748b",
              boxShadow: selectedDayFilter === "today" ? "0 2px 6px rgba(0, 0, 0, 0.06)" : "none",
              fontSize: "13px",
              fontWeight: "600",
              height: "30px",
              padding: "0 14px",
              cursor: "pointer",
            }}
            onClick={() => setSelectedDayFilter("today")}
          >
            {getButtonLabel("today")}
          </Button>
          <Button
            type="text"
            size="small"
            className="segmented-btn"
            style={{
              backgroundColor: selectedDayFilter === "tomorrow" ? "#ffffff" : "transparent",
              color: selectedDayFilter === "tomorrow" ? "#2563eb" : "#64748b",
              boxShadow: selectedDayFilter === "tomorrow" ? "0 2px 6px rgba(0, 0, 0, 0.06)" : "none",
              fontSize: "13px",
              fontWeight: "600",
              height: "30px",
              padding: "0 14px",
              cursor: "pointer",
            }}
            onClick={() => setSelectedDayFilter("tomorrow")}
          >
            {getButtonLabel("tomorrow")}
          </Button>
        </div>

        {/* Timezone Dropdown */}
        <div
          id="tour-appointment-timezone"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            width: "100%",
            maxWidth: "320px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: "#334155",
              fontWeight: "600",
              fontSize: "12.5px",
              whiteSpace: "nowrap",
            }}
          >
            <GlobalOutlined style={{ color: "#2563eb", fontSize: "14px" }} />
            <span>Timezone:</span>
          </div>
          <Select
            showSearch
            size="small"
            style={{ width: "100%" }}
            placeholder="Search timezone..."
            optionFilterProp="children"
            value={selectedTimezone}
            onChange={(value) => {
              setSelectedTimezone(value);
            }}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={timezoneOptions}
            dropdownStyle={{ borderRadius: "8px" }}
          />
        </div>
      </div>

      {/* Info Banner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          padding: "0.4rem 0.85rem",
          backgroundColor: "#f0f9ff",
          border: "1px solid #bae6fd",
          borderRadius: "8px",
          marginBottom: "0.85rem",
        }}
      >
        <Text style={{ fontSize: "12px", color: "#0369a1", textAlign: "center", fontWeight: "500" }}>
          Appointments are displayed in <strong>{selectedTimezone.replace(/_/g, " ")}</strong> (Clinic Zone: Karachi, GMT+5).
        </Text>
      </div>

      {/* Selected Slot Notification Banner */}
      {selectedSlotObj && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            padding: "0.6rem 1rem",
            backgroundColor: "#eff6ff",
            border: "1.5px solid #3b82f6",
            borderRadius: "10px",
            marginBottom: "0.85rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CheckCircleFilled style={{ color: "#2563eb", fontSize: "16px" }} />
            <Text style={{ fontSize: "13px", color: "#1e3a8a", fontWeight: "600" }}>
              Selected Slot:{" "}
              <span>
                {convertUtcToTimezone(selectedSlotObj.startDateTime, selectedTimezone, "dddd, MMM DD")} at{" "}
                {convertUtcToTimezone(selectedSlotObj.startDateTime, selectedTimezone)} -{" "}
                {convertUtcToTimezone(selectedSlotObj.endDateTime, selectedTimezone)}
              </span>
            </Text>
          </div>
          <Text type="secondary" style={{ fontSize: "11.5px", color: "#2563eb", fontWeight: "500" }}>
            Ready to proceed
          </Text>
        </div>
      )}

      {/* Slots Section */}
      <div id="tour-appointment-slots" style={{ width: "100%" }}>
        {appointmentSlots.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "2rem 1rem",
              backgroundColor: "#f8fafc",
              borderRadius: "12px",
              border: "1px dashed #cbd5e1",
            }}
          >
            <Text type="secondary" style={{ fontSize: "13.5px", fontWeight: "500" }}>
              No appointment slots available at this moment.
            </Text>
          </div>
        ) : (
          <div style={{ width: "100%" }}>
            {Object.keys(groupedSlots).length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "2rem 1rem",
                  backgroundColor: "#f8fafc",
                  borderRadius: "12px",
                  border: "1px dashed #cbd5e1",
                }}
              >
                <Text type="secondary" style={{ fontSize: "13.5px", fontWeight: "500" }}>
                  No appointment slots available for {selectedDayFilter === "today" ? getButtonLabel("today") : getButtonLabel("tomorrow")}.
                </Text>
              </div>
            ) : (
              <div className="slots-scroll-container">
                {Object.keys(groupedSlots).map((dateKey) => (
                  <div key={dateKey} style={{ marginBottom: "0.85rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "0.65rem" }}>
                      <div style={{ width: "4px", height: "16px", backgroundColor: "#2563eb", borderRadius: "2px" }} />
                      <Title
                        level={4}
                        style={{
                          margin: 0,
                          fontSize: "15px",
                          color: "#0f172a",
                          fontWeight: "700",
                        }}
                      >
                        {groupedSlots[dateKey].displayDate}
                      </Title>
                    </div>

                    {/* Grid of Slot Cards */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                        gap: "0.65rem",
                      }}
                    >
                      {groupedSlots[dateKey].slots.map((slot, index) => {
                        const isSelected = selectedSlotObj?._id === slot._id;
                        const isFirst = index === 0;
                        return (
                          <AppointmentSlotCard
                            key={slot._id}
                            slot={slot}
                            isSelected={isSelected}
                            isFirst={isFirst}
                            selectedTimezone={selectedTimezone}
                            localTimezone={localTimezone}
                            handleSlotSelection={handleSlotSelection}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectAppointment;