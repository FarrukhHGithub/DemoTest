import React from "react";
import { FiCalendar, FiUserCheck } from "react-icons/fi";

export const ArchivedPatientRow = React.memo(({
  patient,
  index,
  restoringEmail,
  restorePatient,
  formatDate,
  baseUrl,
}) => {
  return (
    <tr className="hover:bg-dry/40 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-textGray font-semibold">
        {index + 1}
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        {patient.profilePicture ? (
          <img
            src={`${baseUrl}/${patient.profilePicture}`}
            alt={patient.fullName}
            className="w-10 h-10 rounded-full object-cover border-2 border-border shadow-sm"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-subMain to-blue-400 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            {patient.fullName?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-semibold text-main">
          {patient.fullName || "N/A"}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600 font-medium">
          {patient.email || "N/A"}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500 font-medium">
          {patient.emergencyContact || "N/A"}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        {patient.bloodGroup ? (
          <span className="px-2.5 py-0.5 inline-flex text-xs font-semibold rounded-full bg-red-50 text-red-600 border border-red-100">
            {patient.bloodGroup}
          </span>
        ) : (
          <span className="text-xs text-textGray font-medium">-</span>
        )}
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2.5 py-0.5 inline-flex text-xs font-semibold rounded-full border ${
          patient.gender === 'Male'
            ? 'bg-blue-50 text-subMain border-blue-100'
            : patient.gender === 'Female'
            ? 'bg-pink-50 text-pink-600 border-pink-100'
            : 'bg-gray-50 text-gray-600 border-gray-100'
        }`}>
          {patient.gender || "N/A"}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
        <div className="flex items-center gap-1.5">
          <FiCalendar className="text-textGray" />
          {formatDate(patient.archivedAt)}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        <button
          id="tour-archived-restore-btn"
          onClick={() => restorePatient(patient.email)}
          disabled={restoringEmail === patient.email}
          className={`
            inline-flex items-center gap-1.5 px-4 py-2 border rounded-xl text-xs font-bold transition-all shadow-sm
            ${restoringEmail === patient.email
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-600 hover:text-white hover:border-transparent active:scale-95'
            }
          `}
        >
          {restoringEmail === patient.email ? (
            <>
              <div className="animate-spin rounded-full h-3 w-3 border-2 border-current border-t-transparent"></div>
              Restoring...
            </>
          ) : (
            <>
              <FiUserCheck className="text-sm" />
              Restore Patient
            </>
          )}
        </button>
      </td>
    </tr>
  );
});
