import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MenuSelectss } from "../Form";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FiEdit, FiEye, FiUser, FiClock } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import BASE_URL from "../../baseUrl.jsx";

const tdClass = "text-start text-xs py-2.5 px-3 whitespace-nowrap text-main/90 border-b border-border/80 align-middle";

function renderAppointmentDetails(item) {
  const hasAppointmentData =
    item.serviceName ||
    item.appointmentStartDateTime ||
    item.appointmentEndDateTime;

  if (!hasAppointmentData) {
    return <span className="text-gray-400 text-xs">No appointment</span>;
  }

  const startDateTime = item.appointmentStartDateTime
    ? new Date(item.appointmentStartDateTime)
    : null;
  const endDateTime = item.appointmentEndDateTime
    ? new Date(item.appointmentEndDateTime)
    : null;

  return (
    <div className="space-y-1">
      {item.serviceName && (
        <div className="font-semibold text-blue-600 text-xs">
          {item.serviceName}
        </div>
      )}
      {startDateTime && (
        <div className="text-gray-600 text-[10px]">
          <span className="font-medium">Date:</span>{" "}
          {startDateTime.toLocaleDateString()}
        </div>
      )}
      {(startDateTime || endDateTime) && (
        <div className="text-gray-600 text-[10px]">
          <span className="font-medium">Time:</span>
          {startDateTime
            ? startDateTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-"}
          {endDateTime &&
            ` - ${endDateTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`}
        </div>
      )}
      {(item.servicePrice !== undefined || item.method) && (
        <div className="flex items-center gap-1.5">
          {item.servicePrice !== undefined && (
            <span className="font-semibold text-green-600 text-xs">
              ${item.servicePrice}
            </span>
          )}
          {item.servicePrice !== undefined && item.method && (
            <span className="text-gray-300">|</span>
          )}
          {item.method && (
            <span
              className={`px-1.5 py-0.5 rounded-full text-[9px] font-medium ${
                item.method === "Online"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-purple-100 text-purple-700"
              }`}
            >
              {item.method}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export const AppointmentPatientRow = React.memo(function AppointmentPatientRow({
  item,
  index,
  onEdit,
  onDeleteAppointmentPatient,
  onCheckPrevious,
}) {
  const navigate = useNavigate();

  const menuOptions = useMemo(() => [
    {
      title: "Edit",
      icon: FiEdit,
      onClick: (patient) => onEdit(patient),
    },
    {
      title: "View",
      icon: FiEye,
      onClick: (patient) => {
        if (patient._id) {
          navigate(`/patients/preview/${patient._id}`, {
            state: {
              profileData: patient,
              appointmentData: patient,
            },
          });
        }
      },
    },
    {
      title: "Previous Details",
      icon: FiClock,
      onClick: (patient) => onCheckPrevious(patient.email),
    },
    {
      title: "Delete",
      icon: RiDeleteBin6Line,
      onClick: (patient) => {
        if (onDeleteAppointmentPatient) {
          onDeleteAppointmentPatient(patient._id);
        }
      },
    },
  ], [onEdit, onDeleteAppointmentPatient, navigate, onCheckPrevious]);

  return (
    <tr className="border-b border-border hover:bg-greyed transitions">
      <td className={tdClass}>{index}</td>
      <td className={tdClass}>
        {item.profilePicture ? (
          <img
            src={`${BASE_URL}/${item.profilePicture}`}
            alt={item.fullName}
            className="w-8 h-8 rounded-full object-cover border border-border"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <FiUser className="text-gray-400" size={16} />
          </div>
        )}
      </td>
      <td className={tdClass}>{item.fullName}</td>
      <td className={tdClass}>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            item.gender?.toLowerCase() === "male"
              ? "bg-blue-50 text-blue-700 border-blue-100"
              : "bg-pink-50 text-pink-700 border-pink-100"
          }`}
        >
          {item.gender}
        </span>
      </td>
      <td className={tdClass}>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
          {item.bloodGroup}
        </span>
      </td>
      <td className={tdClass}>{item.address}</td>
      <td className={tdClass}>
        <div className="truncate max-w-[120px]" title={item.email}>
          {item.email}
        </div>
      </td>
      <td className={tdClass}>{item.emergencyContact}</td>
      <td className={tdClass}>{renderAppointmentDetails(item)}</td>
      <td className={tdClass}>
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
            item.action === "created" || item.action === "approved"
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : item.action === "pending"
                ? "bg-amber-50 text-amber-700 border-amber-100"
                : item.action === "cancelled"
                  ? "bg-rose-50 text-rose-700 border-rose-100"
                  : "bg-gray-50 text-gray-700 border-gray-200"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
              item.action === "created" || item.action === "approved"
                ? "bg-emerald-500"
                : item.action === "pending"
                  ? "bg-amber-500"
                  : item.action === "cancelled"
                    ? "bg-rose-500"
                    : "bg-gray-400"
            }`}
          ></span>
          {item.action
            ? item.action.charAt(0).toUpperCase() +
              item.action.slice(1)
            : "Pending"}
        </span>
      </td>
      <td className={tdClass}>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            item.method === "Online"
              ? "bg-sky-50 text-sky-700 border-sky-100"
              : "bg-purple-50 text-purple-700 border-purple-100"
          }`}
        >
          {item.method || "N/A"}
        </span>
      </td>
      <td className={tdClass}>
        {new Date(item.createdAt).toLocaleString()}
      </td>
      <td className={tdClass} style={{ position: "relative" }}>
        <MenuSelectss datas={menuOptions} item={item}>
          <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg cursor-pointer">
            <BiDotsHorizontalRounded />
          </div>
        </MenuSelectss>
      </td>
    </tr>
  );
});
