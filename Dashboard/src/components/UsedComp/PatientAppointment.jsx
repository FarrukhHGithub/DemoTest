// components/UsedComp/PatientAppointment.jsx
import React from 'react';
import { FiCalendar, FiClock, FiDollarSign, FiMail, FiUser, FiInfo, FiActivity } from 'react-icons/fi';

function PatientAppointment({ appointmentData }) {
  // If no appointment data or empty array
  if (!appointmentData || appointmentData.length === 0) {
    return (
      <div className="w-full py-16 bg-dry rounded-2xl border border-dashed border-border text-center">
        <FiCalendar className="text-4xl text-gray-400 mx-auto mb-3" />
        <h3 className="text-sm font-semibold text-main">No Appointments Found</h3>
        <p className="text-xs text-textGray mt-1">No appointments have been scheduled for this patient.</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch {
      return 'Invalid Time';
    }
  };

  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-50 text-gray-600 border-gray-200';
    const statusLower = status.toLowerCase();
    if (statusLower.includes('confirmed') || statusLower.includes('upcoming')) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    } else if (statusLower.includes('pending')) {
      return 'bg-amber-50 text-amber-700 border-amber-200';
    } else if (statusLower.includes('cancelled') || statusLower.includes('canceled')) {
      return 'bg-rose-50 text-rose-700 border-rose-200';
    } else if (statusLower.includes('completed') || statusLower.includes('done')) {
      return 'bg-sky-50 text-sky-700 border-sky-200';
    }
    return 'bg-gray-50 text-gray-600 border-gray-200';
  };

  const getSourceBadge = (source) => {
    if (!source) return null;
    if (source === 'Web') {
      return <span className="ml-2.5 px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-semibold rounded-full uppercase tracking-wider">Web</span>;
    } else if (source === 'Profile') {
      return <span className="ml-2.5 px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-semibold rounded-full uppercase tracking-wider">Clinic</span>;
    }
    return null;
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-sm font-semibold text-main">Appointments</h1>
      <div className="flex flex-col gap-4">
        {appointmentData.map((appointment, index) => (
          <div
            key={appointment._id || index}
            className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col relative"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-subMain/30"></div>

            {/* Header with Service Name and Status */}
            <div className="p-4 border-b border-border bg-gradient-to-r from-blue-50/50 to-indigo-50/20">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-subMain/10 text-subMain rounded-xl flex items-center justify-center text-lg shadow-sm">
                    🏥
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-semibold text-main text-sm">
                        {appointment.serviceName || 'Service Not Specified'}
                      </h3>
                      {getSourceBadge(appointment.source)}
                    </div>
                    <p className="text-[10px] text-textGray mt-0.5">
                      ID: #{appointment._id?.slice(-6) || 'N/A'}
                    </p>
                  </div>
                </div>
                
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(appointment.status)}`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                    appointment.status?.toLowerCase().includes('confirmed') || appointment.status?.toLowerCase().includes('upcoming')
                      ? 'bg-emerald-500'
                      : appointment.status?.toLowerCase().includes('pending')
                        ? 'bg-amber-500'
                        : appointment.status?.toLowerCase().includes('cancelled')
                          ? 'bg-rose-500'
                          : 'bg-sky-500'
                  }`}></span>
                  {appointment.status ? appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1) : 'Scheduled'}
                </span>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-5 flex flex-col gap-4">
              {/* Patient Info Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-dashed border-border pb-4">
                <div className="flex items-center gap-2.5 text-xs text-main">
                  <FiUser className="text-gray-400 text-sm" />
                  <span className="font-semibold text-textGray">Patient:</span>
                  <span className="font-medium truncate">{appointment.fullName || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-main">
                  <FiMail className="text-gray-400 text-sm" />
                  <span className="font-semibold text-textGray">Email:</span>
                  <span className="font-medium truncate text-subMain">{appointment.email || 'N/A'}</span>
                </div>
              </div>

              {/* Service Details Section */}
              <div className="bg-dry p-4 rounded-xl border border-border/80 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-main uppercase tracking-wider">
                  <FiActivity className="text-subMain text-sm" />
                  <span>Service Details</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1">
                  <div className="text-xs">
                    <span className="text-textGray font-semibold block mb-1">Service:</span>
                    <span className="text-main font-medium">{appointment.serviceName || 'N/A'}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-textGray font-semibold block mb-1">Price:</span>
                    <span className="text-emerald-600 font-bold">${appointment.servicePrice || '0'}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-textGray font-semibold block mb-1">Method:</span>
                    <span className="inline-flex items-center px-2 py-0.5 bg-sky-50 text-sky-700 border border-sky-100 rounded-full font-medium">{appointment.method || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Appointment Date & Time Section */}
              <div className="bg-dry p-4 rounded-xl border border-border/80 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-main uppercase tracking-wider">
                  <FiClock className="text-subMain text-sm" />
                  <span>Appointment Schedule</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1">
                  <div className="text-xs">
                    <span className="text-textGray font-semibold block mb-1">Date:</span>
                    <span className="text-main font-medium flex items-center gap-1">
                      <FiCalendar className="text-gray-400" /> {formatDate(appointment.appointmentStartDateTime)}
                    </span>
                  </div>
                  <div className="text-xs">
                    <span className="text-textGray font-semibold block mb-1">Start Time:</span>
                    <span className="text-main font-medium">{formatTime(appointment.appointmentStartDateTime)}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-textGray font-semibold block mb-1">End Time:</span>
                    <span className="text-main font-medium">{formatTime(appointment.appointmentEndDateTime)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 bg-gray-50 border-t border-border flex flex-wrap justify-between items-center text-[10px] text-textGray">
              <span>Created: {new Date(appointment.createdAt).toLocaleDateString()}</span>
              <span>Last Updated: {new Date(appointment.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientAppointment;