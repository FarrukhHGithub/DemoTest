import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiMail } from "react-icons/fi";
import { IoRefreshOutline } from "react-icons/io5";

export const ArchivedPatientsHeader = ({
  patients,
  emailInput,
  hasSearched,
  clearSearch,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        <Link
          to="/patients"
          className="w-10 h-10 flex items-center justify-center bg-white border border-border text-main rounded-xl hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
          title="Go back to patients list"
        >
          <FiArrowLeft className="text-lg" />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-main">Archived Patients</h1>
            {patients.length > 0 && (
              <span className="px-2.5 py-0.5 bg-subMain/10 text-subMain border border-subMain/20 text-xs font-semibold rounded-full flex items-center gap-1">
                <FiMail className="text-xs" />
                {patients[0]?.email}
              </span>
            )}
          </div>
          <p className="text-sm text-textGray mt-1">
            Search and restore patients that have been archived from active records.
          </p>
        </div>
      </div>
      {(emailInput || hasSearched || patients.length > 0) && (
        <button
          onClick={clearSearch}
          className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 border border-border bg-white text-main hover:bg-gray-50 font-semibold text-sm rounded-xl transition-all shadow-sm"
        >
          <IoRefreshOutline className="text-md hover:rotate-180 transition-transform duration-500" />
          Clear Search
        </button>
      )}
    </div>
  );
};
