import React from "react";
import Layout from "../../Layout";
import Loader from "../../components/Notifications/Loader";
import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { PatientTable } from "../../components/Tables";
import AddEditPatientModal from "./EditPatient";
import { PatientFilters } from "./PatientFilters";
import { usePatients } from "./usePatients";
import Modal from "../../components/Modals/Modal";

function Patients() {
  const {
    isOpen,
    setIsOpen,
    selectedPatient,
    patients,
    webPatients,
    searchQuery,
    setSearchQuery,
    startDate,
    setStartDate,
    genderFilter,
    handleDelete,
    handleDeleteWebPatient,
    handleEdit,
    handleSavePatient,
    handleGenderFilterChange,
    loading,
    archivedPatientModalOpen,
    setArchivedPatientModalOpen,
    archivedPatientDetails,
    checkPreviousDetails,
    restoreArchivedPatient,
  } = usePatients();

  return (
    <Layout>
      <Link
        id="tour-add-patient"
        to="/patients/create"
        className="w-12 h-12 animate-bounce border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-6 right-8 button-fb shadow-md hover:bg-opacity-90 flex items-center justify-center"
      >
        <BiPlus className="text-xl" />
      </Link>
      <h1 className="text-lg sm:text-xl font-bold text-main">Patients</h1>
      <div id="tour-patient-management" className="bg-white my-5 rounded-2xl border border-border p-4 sm:p-5 shadow-xs">
        <PatientFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          genderFilter={genderFilter}
          handleGenderFilterChange={handleGenderFilterChange}
          startDate={startDate}
          setStartDate={setStartDate}
        />

        {loading ? (
          <Loader />
        ) : (
          <div className="mt-4 overflow-x-auto">
            <PatientTable
              patients={patients}
              webPatients={webPatients}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDeleteWebPatient={handleDeleteWebPatient}
              onSavePatient={handleSavePatient}
              onCheckPrevious={checkPreviousDetails}
            />
          </div>
        )}
      </div>

      <AddEditPatientModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        patientData={selectedPatient}
        onSave={handleSavePatient}
      />

      <Modal
        isOpen={archivedPatientModalOpen}
        closeModal={() => setArchivedPatientModalOpen(false)}
        title="Previous Archived Details"
        width="max-w-xl"
      >
        {archivedPatientDetails && (
          <div className="space-y-6 text-left">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-3">
                <div className="w-12 h-12 bg-subMain/10 text-subMain rounded-full flex items-center justify-center font-bold text-lg">
                  {archivedPatientDetails.fullName ? archivedPatientDetails.fullName.charAt(0).toUpperCase() : "P"}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-base">{archivedPatientDetails.fullName}</h3>
                  <p className="text-xs text-slate-400 font-medium">Archived Record Found</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Email</span>
                  <span className="text-slate-700 font-medium break-all">{archivedPatientDetails.email}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Contact</span>
                  <span className="text-slate-700 font-medium">{archivedPatientDetails.emergencyContact || "N/A"}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Gender</span>
                  <span className="text-slate-700 font-medium capitalize">{archivedPatientDetails.gender || "N/A"}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Blood Group</span>
                  <span className="text-slate-700 font-medium">{archivedPatientDetails.bloodGroup || "N/A"}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Address</span>
                  <span className="text-slate-700 font-medium">{archivedPatientDetails.address || "N/A"}</span>
                </div>
                {archivedPatientDetails.createdAt && (
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Created At</span>
                    <span className="text-slate-700 font-medium">
                      {new Date(archivedPatientDetails.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {archivedPatientDetails.updatedAt && (
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Last Updated</span>
                    <span className="text-slate-700 font-medium">
                      {new Date(archivedPatientDetails.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full pt-2">
              <button
                type="button"
                onClick={() => restoreArchivedPatient(archivedPatientDetails.email)}
                className="w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
              >
                Restore Patient
              </button>
              <button
                type="button"
                onClick={() => setArchivedPatientModalOpen(false)}
                className="w-full px-4 py-3 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200 border border-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
}

export default Patients;
