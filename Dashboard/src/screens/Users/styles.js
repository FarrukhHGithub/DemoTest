export const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#F8F9FA",
    transition: "all 0.2s ease-in-out",
    "& fieldset": {
      borderColor: "#E8EBEE",
    },
    "&:hover fieldset": {
      borderColor: "#C0C4CC",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1977CC",
      borderWidth: "1.5px",
    },
    "&.Mui-focused": {
      backgroundColor: "#fff",
      boxShadow: "0 0 0 3px rgba(25, 119, 204, 0.1)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#A0A0A0",
    fontSize: "0.875rem",
    "&.Mui-focused": {
      color: "#1977CC",
    },
  },
  "& .MuiOutlinedInput-input": {
    fontSize: "0.875rem",
    color: "#183253",
    fontWeight: 500,
  },
};
