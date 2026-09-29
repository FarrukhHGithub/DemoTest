import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MenuSelectss } from "../Form";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FiEye, FiUser } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import BASE_URL from "../../baseUrl.jsx";

const tdClass = "text-start text-xs py-2.5 px-3 whitespace-nowrap text-main/90 border-b border-border/80 align-middle";

export const WebPatientRow = React.memo(function WebPatientRow({
  webPatient,
  index,
  onDeleteWebPatient,
}) {
  const navigate = useNavigate();

  const menuOptions = useMemo(() => [
    {
      title: "View",
      icon: FiEye,
      onClick: (patient) => {
        navigate(`/patients/preview/${patient._id}`, {
          state: {
            profileData: patient,
            webPatientData: patient.patientInfo,
          },
        });
      },
    },
    {
      title: "Delete",
      icon: RiDeleteBin6Line,
      onClick: (patient) => onDeleteWebPatient(patient._id),
    },
  ], [onDeleteWebPatient, navigate]);

  return (
    <tr className="border-b border-border hover:bg-greyed transitions">
      <td className={tdClass}>{index}</td>
      <td className={tdClass}>
        {webPatient.patientInfo?.image ? (
          <img
            src={`${BASE_URL}/${webPatient.patientInfo.image}`}
            alt={webPatient.patientInfo.name}
            className="w-10 h-10 rounded-full object-cover border border-border"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <FiUser className="text-gray-400" size={20} />
          </div>
        )}
      </td>
      <td className={tdClass}>{webPatient.patientInfo?.name}</td>
      <td className={tdClass}>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            webPatient.patientInfo?.gender?.toLowerCase() === "male"
              ? "bg-blue-50 text-blue-700 border-blue-100"
              : "bg-pink-50 text-pink-700 border-pink-100"
          }`}
        >
          {webPatient.patientInfo?.gender}
        </span>
      </td>
      <td className={tdClass}>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
          {webPatient.patientInfo?.bloodGroup}
        </span>
      </td>
      <td className={tdClass}>{webPatient.patientInfo?.address}</td>
      <td className={tdClass}>
        <div
          className="truncate max-w-[120px]"
          title={webPatient.patientInfo?.email}
        >
          {webPatient.patientInfo?.email}
        </div>
      </td>
      <td className={tdClass}>
        {webPatient.patientInfo?.emergencyContact}
      </td>
      <td className={tdClass}>
        {webPatient.appointments &&
        webPatient.appointments.length > 0 ? (
          <div className="space-y-2">
            {webPatient.appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="border-b border-gray-100 pb-1 last:border-0"
              >
                <div className="font-medium text-blue-600 text-xs">
                  {appointment.selectedService?.serviceName}
                </div>
                <div className="text-gray-500 text-[10px]">
                  {new Date(
                    appointment.selectedSlot?.startDateTime
                  ).toLocaleDateString()}
                  <span className="mx-1">•</span>
                  {new Date(
                    appointment.selectedSlot?.startDateTime
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(
                    appointment.selectedSlot?.endDateTime
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="text-green-600 font-semibold text-xs">
                  ${appointment.selectedService?.price}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span className="text-gray-400 text-xs">
            No appointments
          </span>
        )}
      </td>
      <td className={tdClass}>
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
            webPatient.status === "Approved"
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : webPatient.status === "Pending"
                ? "bg-amber-50 text-amber-700 border-amber-100"
                : webPatient.status === "Cancelled"
                  ? "bg-rose-50 text-rose-700 border-rose-100"
                  : "bg-gray-50 text-gray-700 border-gray-200"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
              webPatient.status === "Approved"
                ? "bg-emerald-500"
                : webPatient.status === "Pending"
                  ? "bg-amber-500"
                  : webPatient.status === "Cancelled"
                    ? "bg-rose-500"
                    : "bg-gray-400"
            }`}
          ></span>
          {webPatient.status || "Pending"}
        </span>
      </td>
      <td className={tdClass}>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            webPatient.method === "Online"
              ? "bg-sky-50 text-sky-700 border-sky-100"
              : "bg-purple-50 text-purple-700 border-purple-100"
          }`}
        >
          {webPatient.method || "Online"}
        </span>
      </td>
      <td className={tdClass}>
        {new Date(webPatient.createdAt).toLocaleString()}
      </td>
      <td className={tdClass} style={{ position: "relative" }}>
        <MenuSelectss datas={menuOptions} item={webPatient}>
          <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg cursor-pointer">
            <BiDotsHorizontalRounded />
          </div>
        </MenuSelectss>
      </td>
    </tr>
  );
});
