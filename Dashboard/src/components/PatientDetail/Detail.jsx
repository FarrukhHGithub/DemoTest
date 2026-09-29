import React, { useRef, useState } from "react";
import { Button } from "antd";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import "./Detail.css";
import PatientInfoSection from "./Components/PatientInfoSection";
import MedicalRecordsSection from "./Components/MedicalRecordsSection";
import HealthInfoSection from "./Components/HealthInfoSection";
import InvoiceSection from "./Components/InvoiceSection";
import AttachmentsSection from "./Components/AttachmentsSection";
import PDFGenerator from "./Components/PDFGenerator";

const AccordionItem = ({ title, count, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs transition-all duration-200 mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="w-full flex items-center justify-between px-3.5 py-3 sm:px-4 text-left bg-slate-50/70 hover:bg-slate-100/80 transition-colors cursor-pointer select-none"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-3.5 bg-subMain rounded-full"></span>
          <h3 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            {title}
            {count !== undefined && count !== null && (
              <span className="text-[10px] bg-subMain/10 text-subMain px-2 py-0.5 rounded-full font-bold">
                {count}
              </span>
            )}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
            {isOpen ? "Hide" : "Show"}
          </span>
          {isOpen ? (
            <BiChevronUp className="text-xl text-subMain" />
          ) : (
            <BiChevronDown className="text-xl text-slate-400" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="p-3 sm:p-4 border-t border-slate-100">
          {children}
        </div>
      )}
    </div>
  );
};

const PatientDetails = ({
  medicalRecords,
  profileData,
  webPatientData,
  InvoiceData,
  healthInfoData,
  onUpdateMedicalRecord,
  onUpdateHealthInfo,
  onUpdateInvoice,
}) => {
  const pdfRef = useRef();
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleUpdate = () => {
    setRefreshTrigger(prev => !prev);
  };

  // Extract patientId from various sources
  const getPatientId = () => {
    // From profileData
    if (profileData?._id) return profileData._id;
    if (profileData?.id) return profileData.id;
    if (profileData?.patientId) return profileData.patientId;
    
    // From webPatientData
    if (webPatientData?._id) return webPatientData._id;
    if (webPatientData?.id) return webPatientData.id;
    if (webPatientData?.patientId) return webPatientData.patientId;
    
    // From medical records
    if (medicalRecords?.data?.[0]?.patientId) return medicalRecords.data[0].patientId;
    if (medicalRecords?.data?.[0]?.patient?._id) return medicalRecords.data[0].patient._id;
    
    // From health info
    if (healthInfoData?.[0]?.patientId) return healthInfoData[0].patientId;
    if (healthInfoData?.[0]?.patient?._id) return healthInfoData[0].patient._id;
    
    // From invoice data
    if (InvoiceData?.data?.[0]?.patientId) return InvoiceData.data[0].patientId;
    if (InvoiceData?.data?.[0]?.patient?._id) return InvoiceData.data[0].patient._id;
    
    return null;
  };

  const patientId = getPatientId();

  return (
    <div id="patientDetails" className="patient-details-container">
      <div className="patient-details-header">
        <h1 className="patient-details-title">Patient Details Sheet</h1>
        <div className="pdf-btn-wrapper">
          <PDFGenerator
            medicalRecords={medicalRecords}
            profileData={profileData}
            webPatientData={webPatientData}
            InvoiceData={InvoiceData}
            healthInfoData={healthInfoData}
          />
        </div>
      </div>

      <div className="flex-container">
        <AccordionItem title="Patient Information" defaultOpen={true}>
          <PatientInfoSection 
            profileData={profileData} 
            webPatientData={webPatientData} 
          />
        </AccordionItem>

        <AccordionItem
          title="Medical Records"
          count={medicalRecords?.data?.length || 0}
          defaultOpen={true}
        >
          <MedicalRecordsSection 
            medicalRecords={medicalRecords}
            patientId={patientId}
            onUpdate={onUpdateMedicalRecord}
            onRefresh={onUpdateMedicalRecord || handleUpdate}
          />
        </AccordionItem>

        <AccordionItem
          title="Health Information"
          count={healthInfoData?.length || 0}
          defaultOpen={false}
        >
          <HealthInfoSection 
            healthInfoData={healthInfoData}
            patientId={patientId}
            onUpdate={onUpdateHealthInfo}
            onRefresh={onUpdateHealthInfo || handleUpdate}
          />
        </AccordionItem>

        <AccordionItem
          title="Invoices"
          count={InvoiceData?.data?.length || 0}
          defaultOpen={false}
        >
          <InvoiceSection 
            InvoiceData={InvoiceData}
            onUpdate={onUpdateInvoice}
            onRefresh={onUpdateInvoice || handleUpdate}
          />
        </AccordionItem>

        <AccordionItem
          title="Images & Attachments"
          defaultOpen={false}
        >
          <AttachmentsSection medicalRecords={medicalRecords} />
        </AccordionItem>
      </div>
    </div>
  );
};

export default PatientDetails;