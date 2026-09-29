import { useState, useEffect } from "react";
import {
  fetchTotalPatientCount,
  fetchTotalWebPatientCount,
  fetchRecentPatients,
  fetchWebPatientTodayAppointments,
  fetchwebsitePatient,
  fetchMonthlyEarnings,
} from "../Api/api.js";

export function useDashboardData() {
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalPatientsPercentage, setTotalPatientsPercentage] = useState(0);
  const [recentPatients, setRecentPatients] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [appointmentStats, setAppointmentStats] = useState({
    web: 0,
    patient: 0,
    total: 0,
  });
  const [websitePatients, setWebsitePatients] = useState([]);
  const [totalWebPatients, setTotalWebPatients] = useState(0);
  const [webPatientsPercentage, setWebPatientsPercentage] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [earningsPercent, setEarningsPercent] = useState(0);
  const [monthlyEarnings, setMonthlyEarnings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch all data in parallel to avoid sequential blocking waterfalls
      const [
        totalPatientCountRes,
        recentPatientsRes,
        websitePatientsRes,
        totalWebPatientCountRes,
        todayAppointmentsRes,
        monthlyEarningsRes,
      ] = await Promise.allSettled([
        fetchTotalPatientCount(),
        fetchRecentPatients(),
        fetchwebsitePatient(),
        fetchTotalWebPatientCount(),
        fetchWebPatientTodayAppointments(),
        fetchMonthlyEarnings(),
      ]);

      // 1. Total Patient Count
      if (
        totalPatientCountRes.status === "fulfilled" &&
        totalPatientCountRes.value
      ) {
        setTotalPatients(totalPatientCountRes.value.totalCount);
        setTotalPatientsPercentage(totalPatientCountRes.value.percentage);
      }

      // 2. Recent Patients
      if (recentPatientsRes.status === "fulfilled" && recentPatientsRes.value) {
        setRecentPatients(recentPatientsRes.value);
      }

      // 3. Website Patients (transactions)
      if (
        websitePatientsRes.status === "fulfilled" &&
        websitePatientsRes.value
      ) {
        setWebsitePatients(websitePatientsRes.value);
      }

      // 4. Total Web Patient Count
      if (
        totalWebPatientCountRes.status === "fulfilled" &&
        totalWebPatientCountRes.value
      ) {
        setTotalWebPatients(totalWebPatientCountRes.value.totalCount);
        setWebPatientsPercentage(totalWebPatientCountRes.value.percentage);
      }

      // 5. Today's Appointments
      if (
        todayAppointmentsRes.status === "fulfilled" &&
        todayAppointmentsRes.value
      ) {
        const appointmentsData = todayAppointmentsRes.value;

        if (appointmentsData && typeof appointmentsData === "object") {
          if (appointmentsData.data && Array.isArray(appointmentsData.data)) {
            setTodayAppointments(appointmentsData.data);
            if (appointmentsData.stats) {
              setAppointmentStats(appointmentsData.stats);
            } else {
              setAppointmentStats({
                web: appointmentsData.data.filter((a) => a.source === "web")
                  .length,
                patient: appointmentsData.data.filter(
                  (a) => a.source === "patient"
                ).length,
                total: appointmentsData.data.length,
              });
            }
          } else if (
            appointmentsData.appointments &&
            Array.isArray(appointmentsData.appointments)
          ) {
            setTodayAppointments(appointmentsData.appointments);
            setAppointmentStats({
              web: appointmentsData.webCount || 0,
              patient: appointmentsData.patientCount || 0,
              total: appointmentsData.appointments.length,
            });
          } else if (
            appointmentsData.webAppointments &&
            appointmentsData.patientAppointments
          ) {
            const combined = [
              ...appointmentsData.webAppointments,
              ...appointmentsData.patientAppointments,
            ];
            setTodayAppointments(combined);
            setAppointmentStats({
              web: appointmentsData.webAppointments.length,
              patient: appointmentsData.patientAppointments.length,
              total: combined.length,
            });
          } else if (appointmentsData._id) {
            setTodayAppointments([appointmentsData]);
            setAppointmentStats({
              web: appointmentsData.source === "web" ? 1 : 0,
              patient: appointmentsData.source === "patient" ? 1 : 0,
              total: 1,
            });
          } else {
            setTodayAppointments([]);
            setAppointmentStats({ web: 0, patient: 0, total: 0 });
          }
        } else if (Array.isArray(appointmentsData)) {
          setTodayAppointments(appointmentsData);
          setAppointmentStats({
            web: appointmentsData.filter((a) => a.source === "web").length,
            patient: appointmentsData.filter((a) => a.source === "patient")
              .length,
            total: appointmentsData.length,
          });
        } else {
          setTodayAppointments([]);
          setAppointmentStats({ web: 0, patient: 0, total: 0 });
        }
      }

      // 6. Monthly Earnings & Total Earnings
      if (
        monthlyEarningsRes.status === "fulfilled" &&
        monthlyEarningsRes.value
      ) {
        const monthlyData = monthlyEarningsRes.value;
        const earningsArray = monthlyData?.monthlyData || [];
        setMonthlyEarnings(earningsArray);
        const total = earningsArray.reduce(
          (sum, item) => sum + (item.totalEarnings || 0),
          0
        );
        setTotalEarnings(total);
        setEarningsPercent(100);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setTodayAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    totalPatients,
    totalPatientsPercentage,
    recentPatients,
    todayAppointments,
    appointmentStats,
    websitePatients,
    totalWebPatients,
    webPatientsPercentage,
    totalEarnings,
    earningsPercent,
    monthlyEarnings,
    loading,
    refreshData: fetchData,
  };
}
