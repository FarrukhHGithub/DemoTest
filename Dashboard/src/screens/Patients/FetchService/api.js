import axios from "axios";
import BASE_URL from "../../../baseUrl.jsx";

export const getServices = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/services`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // console.log("Services API Response:", data);

    // Return only active services
    return data.filter((service) => service.status);
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const getAppointmentData = async () => {
  try {
    const token = localStorage.getItem("token");

    const [servicesRes, slotsRes] = await Promise.all([
      axios.get(`${BASE_URL}/api/services`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios.get(`${BASE_URL}/api/schedule`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    // console.log("Services Response:", servicesRes.data);
    // console.log("Schedule Response:", slotsRes.data);

    return {
      services: servicesRes.data.filter((service) => service.status),
      timeSlots: slotsRes.data,
    };
  } catch (error) {
    console.error("Error fetching appointment data:", error);
    throw error;
  }
};