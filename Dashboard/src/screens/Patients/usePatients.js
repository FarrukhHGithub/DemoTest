import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import BASE_URL from "../../baseUrl.jsx";
import { useDebounce } from "../../hooks/useDebounce";

export function usePatients() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [webPatients, setWebPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [genderFilter, setGenderFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [archivedPatientModalOpen, setArchivedPatientModalOpen] = useState(false);
  const [archivedPatientDetails, setArchivedPatientDetails] = useState(null);
  const [isCheckingPrevious, setIsCheckingPrevious] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchPatients = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const formattedDate = startDate ? startDate.toLocaleDateString("en-US") : "";

      const response = await axios.get(`${BASE_URL}/api/patients`, {
        params: {
          search: debouncedSearchQuery,
          startDate: formattedDate,
          gender: genderFilter,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      setPatients(
        response.data.filter((patient) => patient.isArchived !== true)
      );
    } catch (error) {
      console.error("❌ Error fetching patients:", error);
      toast.error("Failed to fetch patients");
    }
  }, [debouncedSearchQuery, startDate, genderFilter]);

  const fetchWebPatients = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const webPatientsResponse = await axios.get(`${BASE_URL}/api/web/`, {
        params: { gender: genderFilter },
        headers: { Authorization: `Bearer ${token}` },
      });
      const uniqueWebPatients = webPatientsResponse.data.filter(
        (patient, index, self) =>
          index ===
          self.findIndex(
            (p) => p.patientInfo.email === patient.patientInfo.email
          )
      );
      setWebPatients(uniqueWebPatients);
    } catch (error) {
      console.error("Error fetching webPatients:", error);
      toast.error("Failed to fetch webPatients");
    }
  }, [genderFilter]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchPatients(), fetchWebPatients()]);
      setLoading(false);
    };
    loadData();
  }, [fetchPatients, fetchWebPatients]);

  const handleDelete = useCallback(async (patientId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/api/patients/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients((prev) => prev.filter((patient) => patient._id !== patientId));
      toast.success("Patient deleted successfully");
    } catch (error) {
      console.error("Error deleting patient:", error);
      toast.error("Failed to delete patient");
    }
  }, []);

  const handleDeleteWebPatient = useCallback(async (webPatientId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/api/web/${webPatientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWebPatients((prev) =>
        prev.filter((patient) => patient._id !== webPatientId)
      );
      toast.success("Web patient deleted successfully");
    } catch (error) {
      console.error("Error deleting web patient:", error);
      toast.error("Failed to delete web patient");
    }
  }, []);

  const handleEdit = useCallback((patient) => {
    setSelectedPatient(patient);
    setIsOpen(true);
  }, []);

  const handleSavePatient = useCallback(async (patientData) => {
    try {
      const token = localStorage.getItem("token");
      if (patientData._id) {
        await axios.put(
          `${BASE_URL}/api/patients/${patientData._id}`,
          patientData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Patient updated successfully");
      } else {
        await axios.post(`${BASE_URL}/api/patients`, patientData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Patient created successfully");
      }
      fetchPatients();
    } catch (error) {
      console.error("Error saving patient:", error);
      toast.error("Failed to save patient");
    }
  }, [fetchPatients]);

  const handleGenderFilterChange = useCallback((event) => {
    setGenderFilter(event.target.value.toLowerCase());
  }, []);

  const checkPreviousDetails = useCallback(async (email) => {
    if (!email) {
      toast.error("Patient email is required to check details");
      return;
    }
    setIsCheckingPrevious(true);
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
        setArchivedPatientDetails(res.data.data);
        setArchivedPatientModalOpen(true);
      } else {
        toast.error(`No previous archived records found for email: ${email}`);
      }
    } catch (err) {
      console.error(err);
      toast.error(`No previous archived records found for email: ${email}`);
    } finally {
      setIsCheckingPrevious(false);
    }
  }, []);

  const restoreArchivedPatient = useCallback(async (email) => {
    if (!email) {
      toast.error("Email is required to restore patient");
      return;
    }
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
      toast.success("Patient restored successfully");
      setArchivedPatientModalOpen(false);
      setArchivedPatientDetails(null);
      // reload patient lists
      fetchPatients();
      fetchWebPatients();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to restore patient");
    }
  }, [fetchPatients, fetchWebPatients]);

  return {
    isOpen,
    setIsOpen,
    selectedPatient,
    patients,
    webPatients,
    searchQuery,
    setSearchQuery,
    startDate,
    setStartDate,
    genderFilter,
    handleDelete,
    handleDeleteWebPatient,
    handleEdit,
    handleSavePatient,
    handleGenderFilterChange,
    loading,
    archivedPatientModalOpen,
    setArchivedPatientModalOpen,
    archivedPatientDetails,
    isCheckingPrevious,
    checkPreviousDetails,
    restoreArchivedPatient,
  };
}
