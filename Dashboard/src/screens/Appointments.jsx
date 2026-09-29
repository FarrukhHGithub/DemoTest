import React from "react";
import Layout from "../Layout";
import Loader from "../components/Notifications/Loader";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import AppointmentDetailsModal from "./appointmentDetailModel";
import { CustomToolbar } from "../components/Appointments/CustomToolbar";
import { CustomEvent } from "../components/Appointments/CustomEvent";
import { useAppointments } from "../hooks/useAppointments";

function Appointments() {
  const localizer = momentLocalizer(moment);
  const {
    appointments,
    selectedEvent,
    setSelectedEvent,
    isModalOpen,
    setIsModalOpen,
    loading,
    refreshAppointments,
  } = useAppointments();

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleUpdateStatus = () => {
    refreshAppointments();
  };

  // Event style getter to apply custom colors
  const eventPropGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: "8px",
        opacity: 0.95,
        color: "white",
        border: "none",
        display: "block",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      },
    };
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6 w-full pb-8">
        {loading ? (
          <Loader />
        ) : (
          <div className="h-[calc(100vh-140px)] min-h-[580px] bg-white rounded-xl shadow-xs border border-gray-100 p-3 sm:p-4 overflow-hidden">
            <div className="w-full h-full">
              <Calendar
                localizer={localizer}
                events={appointments}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "100%" }}
                views={["month", "week", "day"]}
                defaultView="month"
                onSelectEvent={handleSelectEvent}
                components={{
                  toolbar: CustomToolbar,
                  event: CustomEvent,
                }}
                eventPropGetter={eventPropGetter}
              />
            </div>
          </div>
        )}

        {selectedEvent && (
          <AppointmentDetailsModal
            isOpen={isModalOpen}
            closeModal={handleCloseModal}
            event={selectedEvent}
            onDelete={handleUpdateStatus}
          />
        )}
      </div>
    </Layout>
  );
}

export default Appointments;