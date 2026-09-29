import React from "react";
import { Link } from "react-router-dom";

export function RecentPatientsList({ recentPatients, baseUrl }) {
  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const date = new Date(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours < 12 ? "AM" : "PM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
  };

  return (
    <div id="tour-recent-patients" className="bg-white rounded-xl border border-border p-4 sm:p-5">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
        Recent Patients
      </h2>
      <div className="flex flex-col gap-1">
        {recentPatients && recentPatients.length > 0 ? (
          recentPatients.map((patient, index) => (
            <Link
              to={`/patients/preview/${patient._id}`}
              key={index}
              className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 -mx-2 rounded-lg transition-colors"
            >
              <img
                src={`${baseUrl}/${patient.profilePicture}`}
                alt="patient"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0 border-2 border-white shadow-sm ring-1 ring-gray-200"
              />
              <div className="flex flex-col min-w-0 flex-1">
                <h3 className="text-xs font-semibold text-gray-700 truncate">
                  {patient.fullName}
                </h3>
                <p className="text-[11px] text-gray-400 truncate mt-0.5">
                  {patient.email}
                </p>
              </div>
              <p className="text-[10px] font-medium text-gray-400 ml-auto whitespace-nowrap">
                {formatTime(patient.createdAt)}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-400 text-xs py-6">
            No recent patients
          </p>
        )}
      </div>
    </div>
  );
}
