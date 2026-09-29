import React from "react";
import Layout from "../../Layout";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import BASE_URL from "../../baseUrl.jsx";
import { usePatientProfile } from "./usePatientProfile";
import { PatientProfileSidebar } from "./PatientProfileSidebar";
import { PatientTabPanel } from "./PatientTabPanel";
import { OtpVerificationModal } from "./OtpVerificationModal";

function PatientProfile() {
  const {
    id,
    profileData,
    webPatientData,
    InvoiceData,
    healthInfoData,
    activeTab,
    setActiveTab,
    isDentalModalOpen,
    otpCode,
    isOtpValid,
    medicalRecords,
    attachments,
    webAppointments,
    closeDentalModal,
    handleOtpInputChange,
    verifyOtp,
    handleMentalHealthTabClick,
    fetchMedicalRecords,
    fetchInvoiceData,
    fetchHealthInformation,
  } = usePatientProfile();

  return (
    <Layout>
      <div className="flex items-center gap-3">
        <Link
          to="/patients"
          className="bg-white border border-subMain border-dashed rounded-lg py-2 px-3 text-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <IoArrowBackOutline />
        </Link>
        <h1 className="text-lg font-bold text-main">
          {profileData.fullName || (webPatientData?.patientInfo?.name || "Patient Profile")}
        </h1>
      </div>
      <div className="grid grid-cols-12 gap-4 sm:gap-5 my-4 items-start">
        <PatientProfileSidebar
          profileData={profileData}
          webPatientData={webPatientData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleMentalHealthTabClick={handleMentalHealthTabClick}
          baseUrl={BASE_URL}
        />

        <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl border border-border p-4 sm:p-5 shadow-sm min-h-[500px]">
          <PatientTabPanel
            activeTab={activeTab}
            id={id}
            webAppointments={webAppointments}
            webPatientData={webPatientData}
            profileData={profileData}
            medicalRecords={medicalRecords}
            attachments={attachments}
            isOtpValid={isOtpValid}
            InvoiceData={InvoiceData}
            healthInfoData={healthInfoData}
            onUpdateMedicalRecord={fetchMedicalRecords}
            onUpdateInvoice={fetchInvoiceData}
            onUpdateHealthInfo={fetchHealthInformation}
          />
        </div>
      </div>

      <OtpVerificationModal
        isOpen={isDentalModalOpen}
        closeModal={closeDentalModal}
        otpCode={otpCode}
        handleOtpInputChange={handleOtpInputChange}
        verifyOtp={verifyOtp}
      />
    </Layout>
  );
}

export default PatientProfile;
