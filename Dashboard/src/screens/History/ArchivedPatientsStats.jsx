import React from "react";
import { FiSearch, FiMail, FiUserMinus } from "react-icons/fi";

export const ArchivedPatientsStats = ({ patients, hasSearched }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Card 1: Search Status */}
      <div className="bg-white p-5 rounded-2xl border border-border shadow-sm flex items-center gap-4 transition-all hover:shadow-md hover:border-subMain/20">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
          hasSearched
            ? (patients.length > 0 ? "bg-green-50 text-green-600 border border-green-100" : "bg-red-50 text-red-500 border border-red-100")
            : "bg-blue-50 text-subMain border border-blue-100"
        }`}>
          <FiSearch />
        </div>
        <div>
          <p className="text-xs font-semibold text-textGray uppercase tracking-wider">Search Status</p>
          <h3 className="text-lg font-bold text-main mt-0.5">
            {hasSearched ? (patients.length > 0 ? 'Patient Found' : 'No Results') : 'Awaiting Input'}
          </h3>
        </div>
      </div>

      {/* Card 2: Matching Records */}
      <div className="bg-white p-5 rounded-2xl border border-border shadow-sm flex items-center gap-4 transition-all hover:shadow-md hover:border-subMain/20">
        <div className="w-12 h-12 bg-blue-50 text-subMain border border-blue-100 rounded-xl flex items-center justify-center text-xl">
          <FiMail />
        </div>
        <div>
          <p className="text-xs font-semibold text-textGray uppercase tracking-wider">Matching Records</p>
          <h3 className="text-lg font-bold text-main mt-0.5">
            {patients.length} Patient{patients.length !== 1 ? 's' : ''}
          </h3>
        </div>
      </div>

      {/* Card 3: Patient State */}
      <div className="bg-white p-5 rounded-2xl border border-border shadow-sm flex items-center gap-4 transition-all hover:shadow-md hover:border-subMain/20">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
          patients.length > 0
            ? "bg-red-50 text-red-500 border border-red-100"
            : "bg-gray-50 text-gray-400 border border-gray-100"
        }`}>
          <FiUserMinus />
        </div>
        <div>
          <p className="text-xs font-semibold text-textGray uppercase tracking-wider">Database Status</p>
          <h3 className="text-lg font-bold text-main mt-0.5">
            {patients.length > 0 ? 'Archived Record' : 'Waiting...'}
          </h3>
        </div>
      </div>
    </div>
  );
};
