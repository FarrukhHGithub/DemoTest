import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import BASE_URL from "../../baseUrl.jsx";
import { getServices, getAppointmentData } from "./api.js";

export function useUserAppointmentModal({ open, onClose, user }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    bloodGroup: "",
    address: "",
    emergencyContact: "",
    serviceId: "",
    timeSlotId: "",
    reasonForVisit: "",
  });

  const [services, setServices] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);

  const fetchAppointmentData = useCallback(async () => {
    setFetchingData(true);
    try {
      const [servicesData, appointmentData] = await Promise.all([
        getServices(),
        getAppointmentData(),
      ]);

      setServices(servicesData || []);
      setTimeSlots(appointmentData.timeSlots || []);
    } catch (error) {
      console.error("Error fetching appointment data:", error);
      toast.error("Failed to load appointment data");
    } finally {
      setFetchingData(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      fetchAppointmentData();
    }
  }, [open, fetchAppointmentData]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        gender: user.gender || "",
        bloodGroup: user.bloodGroup || "",
        address: user.address || "",
        emergencyContact: user.emergencyContact ? String(user.emergencyContact) : "",
      }));
    }
  }, [user]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleClose = useCallback(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      gender: user?.gender || "",
      bloodGroup: user?.bloodGroup || "",
      address: user?.address || "",
      emergencyContact: user?.emergencyContact ? String(user.emergencyContact) : "",
      serviceId: "",
      timeSlotId: "",
      reasonForVisit: "",
    });
    onClose();
  }, [user, onClose]);

  const handleSubmit = useCallback(async () => {
    if (!formData.name) return toast.error("Please enter patient name");
    if (!formData.email) return toast.error("Please enter patient email");
    if (!formData.gender) return toast.error("Please select gender");
    if (!formData.bloodGroup) return toast.error("Please select blood group");
    if (!formData.address) return toast.error("Please enter address");
    if (!formData.emergencyContact) return toast.error("Please enter emergency contact");
    if (!formData.serviceId) return toast.error("Please select a service");
    if (!formData.timeSlotId) return toast.error("Please select a time slot");

    setLoading(true);
    try {
      const selectedService = services.find((service) => service._id === formData.serviceId);
      const selectedSlot = timeSlots.find((slot) => slot._id === formData.timeSlotId);

      const appointmentData = {
        id: user?._id || "",
        name: formData.name,
        email: formData.email,
        image: user?.image || "",
        emergencyContact: String(formData.emergencyContact),
        reasonForVisit: formData.reasonForVisit,
        gender: formData.gender,
        address: formData.address,
        bloodGroup: formData.bloodGroup,
        startDateTime: selectedSlot?.startDateTime,
        endDateTime: selectedSlot?.endDateTime,
        serviceName: selectedService?.name,
        price: selectedService?.price,
      };

      console.log("Sending appointment data:", JSON.stringify(appointmentData, null, 2));

      await axios.post(`${BASE_URL}/api/web/`, appointmentData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Appointment Created Successfully");
      handleClose();
    } catch (err) {
      console.error("Error creating appointment:", err);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else if (err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .map((e) => e.message)
          .join(", ");
        toast.error(errorMessages);
      } else {
        toast.error("Failed to create appointment");
      }
    } finally {
      setLoading(false);
    }
  }, [formData, services, timeSlots, user, handleClose]);

  const formatSlotTime = useCallback((dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }, []);

  return {
    formData,
    services,
    timeSlots,
    loading,
    fetchingData,
    handleChange,
    handleSubmit,
    handleClose,
    formatSlotTime,
  };
}
