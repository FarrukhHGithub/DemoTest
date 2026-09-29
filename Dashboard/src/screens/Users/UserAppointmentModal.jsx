import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { FiX } from "react-icons/fi";
import { useUserAppointmentModal } from "./useUserAppointmentModal";
import { PatientInfoFields } from "./PatientInfoFields";
import { AppointmentDetailsFields } from "./AppointmentDetailsFields";
import { inputSx } from "./styles";

const UserAppointmentModal = ({ open, onClose, user }) => {
  const {
    formData,
    services,
    timeSlots,
    loading,
    fetchingData,
    handleChange,
    handleSubmit,
    handleClose,
    formatSlotTime,
  } = useUserAppointmentModal({ open, onClose, user });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(24, 50, 83, 0.08)",
          border: "1px solid #E8EBEE",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 3,
          backgroundColor: "#fff",
          borderBottom: "1px solid #E8EBEE",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700, color: "#183253" }}>
            Create Appointment
          </h2>
          <p style={{ margin: "4px 0 0 0", fontSize: "0.8125rem", fontWeight: 400, color: "#A0A0A0" }}>
            Schedule a visit for the patient with a chosen service and time slot.
          </p>
        </div>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: "#A0A0A0",
            "&:hover": {
              color: "#183253",
              backgroundColor: "#F3F5F7",
            },
          }}
        >
          <FiX />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 4, pt: 2 }}>
        {fetchingData ? (
          <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "350px" }}>
            <CircularProgress sx={{ color: "#1977CC" }} />
          </Grid>
        ) : (
          <Grid container spacing={2.5}>
            <PatientInfoFields
              formData={formData}
              handleChange={handleChange}
              inputSx={inputSx}
            />
            <AppointmentDetailsFields
              formData={formData}
              handleChange={handleChange}
              services={services}
              timeSlots={timeSlots}
              formatSlotTime={formatSlotTime}
              inputSx={inputSx}
            />
          </Grid>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          borderTop: "1px solid #E8EBEE",
          backgroundColor: "#F8F9FA",
          display: "flex",
          gap: "12px",
        }}
      >
        <Button
          onClick={handleClose}
          disabled={loading || fetchingData}
          variant="outlined"
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            color: "#183253",
            borderColor: "#E8EBEE",
            px: 3.5,
            py: 1.25,
            "&:hover": {
              borderColor: "#C0C4CC",
              backgroundColor: "#F3F5F7",
            },
            "&:disabled": {
              color: "#A0A0A0",
              borderColor: "#E8EBEE",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || fetchingData}
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            backgroundColor: "#1977CC",
            px: 3.5,
            py: 1.25,
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#1565C0",
              boxShadow: "0 4px 12px rgba(25, 119, 204, 0.2)",
            },
            "&:disabled": {
              backgroundColor: "#A0A0A0",
              color: "#fff",
            },
          }}
        >
          {loading ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CircularProgress size={18} color="inherit" />
              <span>Creating...</span>
            </div>
          ) : (
            "Create Appointment"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserAppointmentModal;