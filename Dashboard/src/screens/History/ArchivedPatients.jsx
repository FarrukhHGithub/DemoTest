import React from "react";
import { IoRefreshOutline } from "react-icons/io5";
import {
  FiMail,
  FiUserMinus,
  FiAlertCircle,
  FiCheckCircle,
  FiX
} from "react-icons/fi";
import Layout from '../../Layout';
import BASE_URL from "../../baseUrl.jsx";
import { useArchivedPatients } from "./useArchivedPatients";
import { ArchivedPatientRow } from "./ArchivedPatientRow";
import { ArchivedPatientsHeader } from "./ArchivedPatientsHeader";
import { ArchivedPatientsStats } from "./ArchivedPatientsStats";
import { ArchivedPatientsSearch } from "./ArchivedPatientsSearch";

const ArchivedPatients = () => {
  const {
    patients,
    filteredPatients,
    loading,
    emailInput,
    setEmailInput,
    restoringEmail,
    error,
    setError,
    successMessage,
    setSuccessMessage,
    hasSearched,
    getArchivedPatientByEmail,
    clearSearch,
    restorePatient,
    handleKeyPress,
    formatDate,
  } = useArchivedPatients();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <ArchivedPatientsHeader
          patients={patients}
          emailInput={emailInput}
          hasSearched={hasSearched}
          clearSearch={clearSearch}
        />

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-800 rounded-r-xl flex items-center justify-between shadow-sm transition-all duration-300">
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-green-500 text-lg flex-shrink-0" />
              <span className="text-sm font-medium">{successMessage}</span>
            </div>
            <button
              onClick={() => setSuccessMessage("")}
              className="text-green-600 hover:text-green-800 p-1 hover:bg-green-100 rounded transition-all"
            >
              <FiX className="text-lg" />
            </button>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-800 rounded-r-xl flex items-center justify-between shadow-sm transition-all duration-300">
            <div className="flex items-center gap-3">
              <FiAlertCircle className="text-red-500 text-lg flex-shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800 p-1 hover:bg-red-100 rounded transition-all"
            >
              <FiX className="text-lg" />
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <ArchivedPatientsStats
          patients={patients}
          hasSearched={hasSearched}
        />

        {/* Search Panel Card */}
        <ArchivedPatientsSearch
          emailInput={emailInput}
          setEmailInput={setEmailInput}
          handleKeyPress={handleKeyPress}
          getArchivedPatientByEmail={getArchivedPatientByEmail}
          loading={loading}
        />

        {/* Results Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-dry/40 flex items-center justify-between">
            <h2 className="text-sm font-bold text-main uppercase tracking-wider">Search Results</h2>
            {filteredPatients.length > 0 && (
              <span className="text-xs font-semibold bg-green-50 text-green-700 px-2.5 py-1 rounded-full border border-green-100">
                1 Record Match
              </span>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr className="bg-dry">
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-main uppercase tracking-wider">#</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-main uppercase tracking-wider">Profile</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-main uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-main uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-main uppercase tracking-wider">Contact</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-main uppercase tracking-wider">Blood Group</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-main uppercase tracking-wider">Gender</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-main uppercase tracking-wider">Archived At</th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-main uppercase tracking-wider">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-border">
                {loading ? (
                  <tr>
                    <td colSpan="9" className="px-6 py-16 text-center">
                      <div className="flex items-center justify-center min-h-[200px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                      </div>
                    </td>
                  </tr>
                ) : filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-6 py-16 text-center text-gray-500">
                      {hasSearched ? (
                        <div className="max-w-md mx-auto flex flex-col items-center justify-center">
                          <div className="w-16 h-16 bg-red-50 text-red-500 border border-red-100 rounded-full flex items-center justify-center text-2xl mb-4 shadow-sm">
                            <FiUserMinus />
                          </div>
                          <h3 className="text-base font-bold text-main">No Patient Found</h3>
                          <p className="text-sm text-textGray mt-1.5">
                            We couldn't find an archived patient associated with the email <strong className="text-main font-semibold">{emailInput}</strong>. Please verify the address and try again.
                          </p>
                          <button
                            onClick={clearSearch}
                            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-subMain hover:underline"
                          >
                            <IoRefreshOutline />
                            Search another patient
                          </button>
                        </div>
                      ) : (
                        <div className="max-w-md mx-auto flex flex-col items-center justify-center">
                          <div className="w-16 h-16 bg-blue-50 text-subMain border border-blue-100 rounded-full flex items-center justify-center text-2xl mb-4 shadow-sm animate-pulse">
                            <FiMail />
                          </div>
                          <h3 className="text-base font-bold text-main">Lookup Patient Details</h3>
                          <p className="text-sm text-textGray mt-1.5">
                            Provide the patient's registered email address above to fetch their profile details and restoration actions.
                          </p>
                        </div>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient, index) => (
                    <ArchivedPatientRow
                      key={patient._id}
                      patient={patient}
                      index={index}
                      restoringEmail={restoringEmail}
                      restorePatient={restorePatient}
                      formatDate={formatDate}
                      baseUrl={BASE_URL}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="bg-dry/40 px-6 py-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-textGray">
            <div>
              {filteredPatients.length > 0 ? (
                <span>Showing archived record for: <strong className="text-main font-bold">{filteredPatients[0]?.email}</strong></span>
              ) : hasSearched ? (
                <span>No results to display</span>
              ) : (
                <span>Enter an email above to query archives</span>
              )}
            </div>
            <div>
              {filteredPatients.length > 0 && (
                <span className="bg-white border border-border px-2.5 py-1 rounded-lg">
                  Total Matching: {filteredPatients.length} record(s)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArchivedPatients;