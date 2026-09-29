import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

export function TodayAppointmentsList({ todayAppointments }) {
  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const date = new Date(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours < 12 ? "AM" : "PM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
  };

  const getStatusBadge = (status) => {
    let classes = "bg-gray-50 text-gray-600 border border-gray-200";
    if (status === "Pending")
      classes = "bg-amber-50 text-amber-600 border border-amber-200";
    else if (status === "Cancel" || status === "Cancelled")
      classes = "bg-rose-50 text-rose-600 border border-rose-200";
    else if (
      status === "Approved" ||
      status === "Confirmed" ||
      status === "Completed"
    )
      classes = "bg-emerald-50 text-emerald-600 border border-emerald-200";

    return (
      <span
        className={`px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold rounded-full ${classes}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div id="tour-today-appointments" className="bg-white rounded-xl border border-border p-4 sm:p-5">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
        Today's Appointments
      </h2>
      <div className="flex flex-col gap-1">
        {todayAppointments && todayAppointments.length > 0 ? (
          <>
            {todayAppointments.slice(0, 3).map((appointment, index) => (
              <div
                key={index}
                className="flex gap-3 py-3 border-b border-gray-100 last:border-0"
              >
                {/* Time */}
                <div className="text-[11px] font-semibold text-gray-500 w-20 flex-shrink-0 flex flex-col justify-center">
                  {appointment?.selectedSlot?.startDateTime ? (
                    <>
                      <span className="text-main">
                        {formatTime(appointment.selectedSlot.startDateTime)}
                      </span>
                      <span className="text-[10px] text-gray-400 mt-0.5">
                        to {formatTime(appointment.selectedSlot.endDateTime)}
                      </span>
                    </>
                  ) : appointment?.appointmentStartDateTime ? (
                    <>
                      <span className="text-main">
                        {formatTime(appointment.appointmentStartDateTime)}
                      </span>
                      <span className="text-[10px] text-gray-400 mt-0.5">
                        to {formatTime(appointment.appointmentEndDateTime)}
                      </span>
                    </>
                  ) : (
                    "N/A"
                  )}
                </div>

                {/* Patient Info & Status */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-semibold text-gray-700 truncate">
                      {appointment.patientInfo?.name ||
                        appointment.fullName ||
                        "Unknown"}
                    </h4>
                    {getStatusBadge(appointment.status)}
                  </div>
                  <p className="text-[11px] text-gray-400 truncate mt-0.5">
                    {appointment.patientInfo?.email ||
                      appointment.email ||
                      "No email"}
                  </p>
                  {appointment.source && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-wide uppercase text-blue-500 mt-1 bg-blue-50 px-1.5 py-0.5 rounded">
                      {appointment.source === "web" ? "🌐 Web" : "📋 Patient"}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* View Details Button */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <Link to="/appointments">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                  <span>View All Appointments</span>
                  <BsArrowRight className="text-sm" />
                </button>
              </Link>
              {todayAppointments.length > 3 && (
                <p className="text-center text-xs text-gray-400 mt-2 font-medium">
                  + {todayAppointments.length - 3} more appointment
                  {todayAppointments.length - 3 > 1 ? "s" : ""}
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <p className="text-center text-gray-400 text-xs py-6">
              No appointments today
            </p>
            <div className="mt-2 pt-3 border-t border-gray-100">
              <Link to="/appointments">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                  <span>View All Appointments</span>
                  <BsArrowRight className="text-sm" />
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
