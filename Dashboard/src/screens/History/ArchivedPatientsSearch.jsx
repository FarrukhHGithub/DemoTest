import React from "react";
import { FiMail, FiX, FiSearch, FiInfo } from "react-icons/fi";

export const ArchivedPatientsSearch = ({
  emailInput,
  setEmailInput,
  handleKeyPress,
  getArchivedPatientByEmail,
  loading,
}) => {
  return (
    <div id="tour-archived-search-panel" className="bg-white p-6 rounded-2xl border border-border shadow-sm mb-8">
      <label className="block text-xs font-semibold text-main uppercase tracking-wider mb-2">
        Search Patient by Email
      </label>
      <div className="relative flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-textGray text-lg" />
          <input
            type="email"
            placeholder="e.g. patient@example.com"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-11 pr-10 py-3.5 bg-dry border border-border rounded-xl text-main text-sm focus:bg-white focus:outline-none focus:border-subMain focus:ring-4 focus:ring-subMain/10 transition-all font-medium placeholder-gray-400"
          />
          {emailInput && (
            <button
              onClick={() => setEmailInput("")}
              className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-0.5 hover:bg-gray-100 rounded-full"
            >
              <FiX className="text-base" />
            </button>
          )}
        </div>
        <button
          onClick={() => getArchivedPatientByEmail(emailInput)}
          disabled={!emailInput.trim() || loading}
          className={`px-6 py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-sm ${
            emailInput.trim() && !loading
              ? 'bg-subMain text-white hover:bg-subMain/90 active:scale-95 hover:shadow-md hover:shadow-subMain/10'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
          }`}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
              Searching...
            </>
          ) : (
            <>
              <FiSearch className="text-base" />
              Search
            </>
          )}
        </button>
      </div>
      <p className="text-xs text-textGray mt-2 flex items-center gap-1.5">
        <FiInfo className="text-xs" />
        Patient archiving helps keep your active directory clean. Use their exact registered email to lookup their files.
      </p>
    </div>
  );
};
