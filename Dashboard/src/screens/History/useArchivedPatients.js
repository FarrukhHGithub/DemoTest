import { useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import BASE_URL from "../../baseUrl.jsx";

export function useArchivedPatients() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [restoringEmail, setRestoringEmail] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const getArchivedPatientByEmail = useCallback(async (email) => {
    if (!email || !email.trim()) {
      setError("Please enter an email address");
      toast.error("Please enter an email address");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage("");
    setHasSearched(true);
    
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${BASE_URL}/api/patients/archived/email/${encodeURIComponent(email.trim())}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (res.data && res.data.data) {
        const patient = res.data.data;
        setPatients([patient]);
        setFilteredPatients([patient]);
        setSuccessMessage(`Found archived patient with email: ${email}`);
        toast.success(`Found archived patient record`);
        setEmailInput(email);
      }
    } catch (err) {
      console.error(err.response?.data || err);
      const errorMessage = err.response?.data?.message || "No archived patient found with this email";
      setError(errorMessage);
      toast.error(errorMessage);
      setPatients([]);
      setFilteredPatients([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setEmailInput("");
    setPatients([]);
    setFilteredPatients([]);
    setError(null);
    setSuccessMessage("");
    setHasSearched(false);
  }, []);

  const restorePatient = useCallback(async (email) => {
    if (!email) {
      toast.error("Email is required to restore patient");
      return;
    }

    setRestoringEmail(email);
    setError(null);
    setSuccessMessage("");
    
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${BASE_URL}/api/patients/restore-by-email`,
        { email: email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      setSuccessMessage(`Patient with email ${email} restored successfully`);
      toast.success(`Patient with email ${email} restored successfully`);
      
      setTimeout(() => {
        clearSearch();
      }, 1500);
      
    } catch (err) {
      console.error(err.response?.data || err);
      const errorMessage = err.response?.data?.message || "Failed to restore patient";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setRestoringEmail(null);
    }
  }, [clearSearch]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      getArchivedPatientByEmail(emailInput);
    }
  }, [emailInput, getArchivedPatientByEmail]);

  const formatDate = useCallback((date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  return {
    patients,
    filteredPatients,
    loading,
    emailInput,
    setEmailInput,
    restoringEmail,
    error,
    setError,
    successMessage,
    setSuccessMessage,
    hasSearched,
    getArchivedPatientByEmail,
    clearSearch,
    restorePatient,
    handleKeyPress,
    formatDate,
  };
}
