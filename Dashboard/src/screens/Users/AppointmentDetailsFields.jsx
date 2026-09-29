import React from "react";
import { Grid, FormControl, InputLabel, Select, MenuItem, InputAdornment, TextField } from "@mui/material";
import { FiCalendar, FiBriefcase, FiClock, FiFileText } from "react-icons/fi";

export function AppointmentDetailsFields({
  formData,
  handleChange,
  services,
  timeSlots,
  formatSlotTime,
  inputSx,
}) {
  return (
    <>
      <Grid item xs={12} sx={{ mt: 2, mb: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            borderBottom: "1px solid #E8EBEE",
            paddingBottom: "8px",
          }}
        >
          <FiCalendar style={{ color: "#1977CC", fontSize: "1.1rem" }} />
          <h4 style={{ margin: 0, color: "#183253", fontWeight: 600, fontSize: "0.95rem" }}>
            Appointment Details
          </h4>
        </div>
        <h2
          style={{
            color: "red",
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "600",
          }}
        >
          If You want to add Any Appointment to This Patient, Select Service and Time Slot Below
        </h2>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth sx={inputSx}>
          <InputLabel id="service-label">Select Service</InputLabel>
          <Select
            labelId="service-label"
            name="serviceId"
            value={formData.serviceId}
            onChange={handleChange}
            label="Select Service"
            required
            startAdornment={
              <InputAdornment position="start">
                <FiBriefcase style={{ color: "#A0A0A0", marginRight: "8px" }} />
              </InputAdornment>
            }
          >
            {services.map((service) => (
              <MenuItem key={service._id} value={service._id}>
                {service.name} - ${service.price}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth sx={inputSx}>
          <InputLabel id="time-slot-label">Select Time Slot</InputLabel>
          <Select
            labelId="time-slot-label"
            name="timeSlotId"
            value={formData.timeSlotId}
            onChange={handleChange}
            label="Select Time Slot"
            required
            startAdornment={
              <InputAdornment position="start">
                <FiClock style={{ color: "#A0A0A0", marginRight: "8px" }} />
              </InputAdornment>
            }
          >
            {timeSlots.map((slot) => (
              <MenuItem key={slot._id} value={slot._id}>
                {formatSlotTime(slot.startDateTime)} - {formatSlotTime(slot.endDateTime)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          multiline
          rows={3}
          fullWidth
          label="Reason for Visit"
          name="reasonForVisit"
          value={formData.reasonForVisit}
          onChange={handleChange}
          placeholder="Please describe the reason for your visit"
          sx={inputSx}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" style={{ alignSelf: "flex-start", marginTop: "8px" }}>
                <FiFileText style={{ color: "#A0A0A0" }} />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </>
  );
}
