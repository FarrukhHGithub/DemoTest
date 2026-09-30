import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../baseUrl.jsx";

export function usePatientProfile() {
  const { id } = useParams();
  const [profileData, setProfileData] = useState({});
  const [archiveRefreshKey, setArchiveRefreshKey] = useState(0);
  const [webPatientData, setWebPatientData] = useState({});
  const [InvoiceData, setInvoiceData] = useState({});
  const [healthInfoData, setHealthInfoData] = useState({});
  const [activeTab, setActiveTab] = useState(9);
  const [isDentalModalOpen, setIsDentalModalOpen] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [error, setError] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [webAppointments, setWebAppointments] = useState([]);

  const fetchProfileData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const profileResponse = await axios.get(
        `${BASE_URL}/api/patients/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfileData(profileResponse.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  }, [id]);

  const fetchWebPatientData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/web/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWebPatientData(response.data);
      if (response.data.patientInfo && response.data.patientInfo.attachment) {
        setAttachments(response.data.patientInfo.attachment);
      }
      if (response.data.appointments && response.data.appointments.length > 0) {
        setWebAppointments(response.data.appointments);
      }
    } catch (error) {
      console.error("Error fetching web patient data:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchProfileData();
    fetchWebPatientData();
  }, [fetchProfileData, fetchWebPatientData]);

  const fetchMedicalRecords = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/medical-records/preview/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMedicalRecords(response.data);
    } catch (error) {
      console.error("Error fetching medical records:", error);
      setError("Error fetching medical records.");
    }
  }, [id]);

  const fetchInvoiceData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/invoices/patient/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInvoiceData(response.data);
    } catch (error) {
      console.error("Error fetching invoice data:", error);
    }
  }, [id]);

  const fetchHealthInformation = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/health-information/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHealthInfoData(response.data);
    } catch (error) {
      console.error("Error fetching health information:", error);
    }
  }, [id]);

  useEffect(() => {
    if (activeTab === 1 || activeTab === 5 || activeTab === 9) {
      fetchMedicalRecords();
    }
  }, [activeTab, fetchMedicalRecords]);

  useEffect(() => {
    if (activeTab === 3 || activeTab === 9) {
      fetchInvoiceData();
    }
  }, [activeTab, fetchInvoiceData]);

  useEffect(() => {
    if (activeTab === 8 || activeTab === 9) {
      fetchHealthInformation();
    }
  }, [activeTab, fetchHealthInformation]);

  const handleArchiveSuccess = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const profileResponse = await axios.get(
        `${BASE_URL}/api/patients/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfileData(profileResponse.data);
      setArchiveRefreshKey((prev) => prev + 1);
      alert("Archive status updated successfully");
    } catch (error) {
      console.error("Error refreshing profile data:", error);
    }
  }, [id]);

  const openDentalModal = useCallback(() => {
    setIsDentalModalOpen(true);
  }, []);

  const closeDentalModal = useCallback(() => {
    setIsDentalModalOpen(false);
  }, []);

  const handleOtpInputChange = useCallback((event) => {
    setOtpCode(event.target.value);
  }, []);

  const verifyOtp = useCallback(async (otpType) => {
    const email = "info@medicareplus.com";
    try {
      const response = await axios.post(
        `${BASE_URL}/api/otp/verify-otp`,
        { email, otp: otpCode, otpType },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data.success) {
        setIsOtpValid(true);
        setIsDentalModalOpen(false);
      } else {
        alert("Invalid OTP code. Please try again.");
        setIsOtpValid(false);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("An error occurred while verifying OTP. Please try again.");
      setIsOtpValid(false);
    }
  }, [otpCode]);

  const handleMentalHealthTabClick = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/otp/send-otp-to-doctor`,
        { email: "info@medicareplus.com", otpType: "dental" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        openDentalModal();
        setActiveTab(6);
      }
    } catch (error) {
      console.error("Error sending OTP to doctor:", error);
    }
  }, [openDentalModal]);

  return {
    id,
    profileData,
    archiveRefreshKey,
    webPatientData,
    InvoiceData,
    healthInfoData,
    activeTab,
    setActiveTab,
    isDentalModalOpen,
    otpCode,
    isOtpValid,
    medicalRecords,
    error,
    attachments,
    webAppointments,
    handleArchiveSuccess,
    openDentalModal,
    closeDentalModal,
    handleOtpInputChange,
    verifyOtp,
    handleMentalHealthTabClick,
    fetchMedicalRecords,
    fetchInvoiceData,
    fetchHealthInformation,
  };
}
