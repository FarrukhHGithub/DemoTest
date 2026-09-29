import React from "react";
import Layout from "../Layout";
import Loader from "../components/Notifications/Loader";
import { BsCheckCircleFill } from "react-icons/bs";
import { TbCalendar } from "react-icons/tb";
import { MdOutlineAttachMoney } from "react-icons/md";
import BASE_URL from "../baseUrl.jsx";

import { DashboardBigChart } from "../components/Charts";
import { Transactiontables } from "../components/Tables";
import { DashboardCard } from "../components/Dashboard/DashboardCard";
import { RecentPatientsList } from "../components/Dashboard/RecentPatientsList";
import { TodayAppointmentsList } from "../components/Dashboard/TodayAppointmentsList";
import { useDashboardData } from "../hooks/useDashboardData";

function Dashboard() {
  const {
    totalPatients,
    totalPatientsPercentage,
    recentPatients,
    todayAppointments,
    appointmentStats,
    websitePatients,
    totalEarnings,
    earningsPercent,
    monthlyEarnings,
    loading,
  } = useDashboardData();

  const dashboardCards = [
    {
      id: 1,
      title: "Total Patient",
      icon: BsCheckCircleFill,
      value: totalPatients,
      percent: totalPatientsPercentage,
      color: ["bg-subMain", "text-subMain", "#66B5A3"],
      datas: [totalPatients],
    },
    {
      id: 2,
      title: "Today's Appointments",
      icon: TbCalendar,
      value: appointmentStats.total || todayAppointments.length,
      percent: 100,
      color: ["bg-yellow-500", "text-yellow-500", "#F9C851"],
      datas: [appointmentStats.total || todayAppointments.length],
    },
    {
      id: 4,
      title: "Total Earnings",
      icon: MdOutlineAttachMoney,
      value: totalEarnings,
      percent: earningsPercent,
      color: ["bg-red-500", "text-red-500", "#FF3B30"],
      datas: [totalEarnings],
    },
  ];

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* boxes */}
          <div
            id="tour-dashboard-cards"
            className="w-full grid xl:grid-cols-3 gap-4 sm:gap-5 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1"
          >
            {dashboardCards.map((card) => (
              <DashboardCard key={card.id} card={card} />
            ))}
          </div>

          <div className="w-full my-5 grid xl:grid-cols-8 grid-cols-1 gap-4 sm:gap-5">
            <div className="xl:col-span-6 w-full flex flex-col gap-5">
              {/* Earnings card */}
              <div
                id="tour-earning-report"
                className="bg-white rounded-xl border border-border p-4 sm:p-5"
              >
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <div>
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Earning Reports
                    </h2>
                    <h3 className="text-xl sm:text-2xl font-bold text-main mt-0.5">
                      ${totalEarnings}
                    </h3>
                  </div>
                  <span className="py-0.5 px-2.5 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full border border-emerald-100">
                    +{earningsPercent}% growth
                  </span>
                </div>
                <div className="mt-4">
                  <DashboardBigChart monthlyData={monthlyEarnings} />
                </div>
              </div>

              {/* Table list card */}
              <div
                id="tour-patient-transactions"
                className="bg-white rounded-xl border border-border p-4 sm:p-5"
              >
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                  Patient Transactions
                </h2>
                <div className="mt-1 overflow-x-auto">
                  <Transactiontables data={websitePatients} action={true} />
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="xl:col-span-2 grid sm:grid-cols-2 xl:grid-cols-1 gap-4 sm:gap-5">
              <RecentPatientsList
                recentPatients={recentPatients}
                baseUrl={BASE_URL}
              />
              <TodayAppointmentsList todayAppointments={todayAppointments} />
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

export default Dashboard;