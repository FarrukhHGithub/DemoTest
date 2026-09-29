import React from "react";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, InputAdornment } from "@mui/material";
import { FiUser, FiMail, FiHeart, FiMapPin, FiPhone } from "react-icons/fi";

export function PatientInfoFields({ formData, handleChange, inputSx }) {
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const genders = ["Male", "Female", "Other"];

  return (
    <>
      <Grid item xs={12} sx={{ mt: 1, mb: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            borderBottom: "1px solid #E8EBEE",
            paddingBottom: "8px",
          }}
        >
          <FiUser style={{ color: "#1977CC", fontSize: "1.1rem" }} />
          <h4 style={{ margin: 0, color: "#183253", fontWeight: 600, fontSize: "0.95rem" }}>
            Patient Information
          </h4>
        </div>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          sx={inputSx}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiUser style={{ color: "#A0A0A0" }} />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          sx={inputSx}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiMail style={{ color: "#A0A0A0" }} />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth sx={inputSx}>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            label="Gender"
            required
            startAdornment={
              <InputAdornment position="start">
                <FiUser style={{ color: "#A0A0A0", marginRight: "8px" }} />
              </InputAdornment>
            }
          >
            {genders.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth sx={inputSx}>
          <InputLabel id="blood-group-label">Blood Group</InputLabel>
          <Select
            labelId="blood-group-label"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            label="Blood Group"
            required
            startAdornment={
              <InputAdornment position="start">
                <FiHeart style={{ color: "#A0A0A0", marginRight: "8px" }} />
              </InputAdornment>
            }
          >
            {bloodGroups.map((group) => (
              <MenuItem key={group} value={group}>
                {group}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          sx={inputSx}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiMapPin style={{ color: "#A0A0A0" }} />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Emergency Contact"
          name="emergencyContact"
          type="text"
          value={formData.emergencyContact}
          onChange={handleChange}
          required
          placeholder="Phone number"
          helperText="Enter phone number without special characters"
          sx={{
            ...inputSx,
            "& .MuiFormHelperText-root": {
              color: "#A0A0A0",
              fontSize: "0.75rem",
              marginTop: "4px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiPhone style={{ color: "#A0A0A0" }} />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </>
  );
}
