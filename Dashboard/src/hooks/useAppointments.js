import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import { toast } from "react-hot-toast";
import BASE_URL from "../baseUrl.jsx";
import { useDriverTour } from "./useDriverTour";

export function useAppointments() {
  const { refreshTour } = useDriverTour();
  const [appointments, setAppointments] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshTour();
  }, [appointments, isModalOpen]);

  // Helper function to convert UTC to local time
  const convertToLocalTime = useCallback((utcDateString) => {
    if (!utcDateString) return null;
    const utcMoment = moment.utc(utcDateString);
    return utcMoment.local().toDate();
  }, []);

  // Function to determine appointment color
  const getAppointmentColor = useCallback((status, serviceName) => {
    const colors = {
      Pending: "#F59E0B",
      Confirmed: "#10B981",
      Completed: "#3B82F6",
      Cancelled: "#EF4444",
      Approved: "#10B981",
      Cancel: "#EF4444",
    };

    if (status && colors[status]) {
      return colors[status];
    }

    const serviceColors = {
      "Daily check up": "#66B5A3",
      "testing purpose stripe": "#8B5CF6",
    };

    return serviceColors[serviceName?.trim()] || "#66B5A3";
  }, []);

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Fetch appointments from the combined endpoint
      const response = await axios.get(`${BASE_URL}/api/web/appointments/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("📊 Appointments Response:", response.data);

      const formattedAppointments = [];

      if (response.data.success && response.data.data) {
        const appointmentsData = response.data.data;

        appointmentsData.forEach((appointment) => {
          if (appointment.source === "web") {
            // Process Web Appointment
            const {
              patientInfo,
              appointments: groupAppointments,
              _id: groupId,
              status,
              method,
            } = appointment;

            if (groupAppointments && Array.isArray(groupAppointments)) {
              groupAppointments.forEach((apt) => {
                const uniqueId = `web_${groupId}_${apt._id}`;
                const patientEmail = patientInfo?.email || "No email";
                const serviceName =
                  apt.selectedService?.serviceName?.trim() || "Appointment";

                const startLocal = convertToLocalTime(
                  apt.selectedSlot?.startDateTime
                );
                const endLocal = convertToLocalTime(
                  apt.selectedSlot?.endDateTime
                );

                if (startLocal && endLocal) {
                  formattedAppointments.push({
                    id: uniqueId,
                    title: `${patientEmail} - ${serviceName}`,
                    patientEmail: patientEmail,
                    patientInfo: patientInfo
                      ? {
                          ...patientInfo,
                          name: patientInfo.name || "N/A",
                          email: patientInfo.email || "N/A",
                          emergencyContact:
                            patientInfo.emergencyContact ||
                            patientInfo.phone ||
                            "N/A",
                          bloodGroup: patientInfo.bloodGroup || "N/A",
                          gender: patientInfo.gender || "N/A",
                        }
                      : null,
                    selectedService: apt.selectedService
                      ? {
                          ...apt.selectedService,
                          serviceName:
                            apt.selectedService.serviceName ||
                            apt.selectedService.name ||
                            "Appointment",
                          name:
                            apt.selectedService.serviceName ||
                            apt.selectedService.name ||
                            "Appointment",
                          price: apt.selectedService.price || 0,
                        }
                      : null,
                    selectedSlot: apt.selectedSlot,
                    appointmentId: apt._id,
                    groupId: groupId,
                    status: status || "Pending",
                    method: method || "Online",
                    serviceName: serviceName,
                    createdAt: apt.createdAt,
                    start: startLocal,
                    end: endLocal,
                    source: "web",
                    color: getAppointmentColor(status, serviceName),
                  });
                }
              });
            }
          } else if (appointment.source === "patient") {
            // Process Patient Appointment
            const patient = appointment;
            const uniqueId = `patient_${patient._id}`;
            const patientEmail =
              patient.patientInfo?.email || patient.email || "No email";
            const serviceName =
              patient.appointments?.[0]?.selectedService?.serviceName ||
              patient.serviceName ||
              "Appointment";

            const startLocal = convertToLocalTime(
              patient.appointments?.[0]?.selectedSlot?.startDateTime ||
                patient.appointmentStartDateTime
            );
            const endLocal = convertToLocalTime(
              patient.appointments?.[0]?.selectedSlot?.endDateTime ||
                patient.appointmentEndDateTime
            );

            if (startLocal && endLocal) {
              formattedAppointments.push({
                id: uniqueId,
                title: `${patientEmail} - ${serviceName}`,
                patientEmail: patientEmail,
                patientInfo: {
                  name: patient.patientInfo?.name || patient.fullName || "N/A",
                  email: patient.patientInfo?.email || patient.email || "N/A",
                  emergencyContact:
                    patient.patientInfo?.emergencyContact ||
                    patient.patientInfo?.phone ||
                    patient.emergencyContact ||
                    "N/A",
                  bloodGroup:
                    patient.patientInfo?.bloodGroup ||
                    patient.bloodGroup ||
                    "N/A",
                  gender:
                    patient.patientInfo?.gender || patient.gender || "N/A",
                  isArchived:
                    patient.patientInfo?.isArchived ||
                    patient.isArchived ||
                    false,
                },
                selectedService: {
                  serviceName: serviceName,
                  name: serviceName,
                  price:
                    patient.appointments?.[0]?.selectedService?.price ||
                    patient.servicePrice ||
                    0,
                },
                selectedSlot: {
                  startDateTime:
                    patient.appointments?.[0]?.selectedSlot?.startDateTime ||
                    patient.appointmentStartDateTime,
                  endDateTime:
                    patient.appointments?.[0]?.selectedSlot?.endDateTime ||
                    patient.appointmentEndDateTime,
                },
                appointmentId: patient.appointments?.[0]?._id || patient._id,
                groupId: patient._id,
                status: patient.status || "Approved",
                method: patient.method || "Physical",
                serviceName: serviceName,
                createdAt: patient.createdAt,
                start: startLocal,
                end: endLocal,
                source: "patient",
                color: getAppointmentColor(
                  patient.status || "Approved",
                  serviceName
                ),
              });
            }
          }
        });
      }

      setAppointments(formattedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  }, [convertToLocalTime, getAppointmentColor]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    appointments,
    selectedEvent,
    setSelectedEvent,
    isModalOpen,
    setIsModalOpen,
    loading,
    refreshAppointments: fetchAppointments,
  };
}
