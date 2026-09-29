import React from "react";
import MedicalRecord from "./MedicalRecord";
import AppointmentsUsed from "../../components/UsedComp/AppointmentsUsed";
import InvoiceUsed from "../../components/UsedComp/InvoiceUsed";
import PatientAppointment from "../../components/UsedComp/PatientAppointment";
import PatientImages from "./PatientImages";
import DentalChart from "./DentalChart";
import HealthInfomation from "./HealthInfomation";
import PatientDetails from "../../components/PatientDetail/Detail";

export const PatientTabPanel = ({
  activeTab,
  id,
  webAppointments,
  webPatientData,
  profileData,
  medicalRecords,
  attachments,
  isOtpValid,
  InvoiceData,
  healthInfoData,
  onUpdateMedicalRecord,
  onUpdateInvoice,
  onUpdateHealthInfo,
}) => {
  switch (activeTab) {
    case 1:
      return <MedicalRecord />;
    case 2:
      return (
        <AppointmentsUsed
          doctor={false}
          patientId={id}
          token={localStorage.getItem("token")}
        />
      );
    case 3:
      return (
        <InvoiceUsed patientId={id} token={localStorage.getItem("token")} />
      );
    case 4:
      const allAppointments = [];
      if (webAppointments && webAppointments.length > 0) {
        webAppointments.forEach((appt) => {
          allAppointments.push({
            _id: appt._id || `web_${Date.now()}`,
            fullName: webPatientData?.patientInfo?.name || 'N/A',
            email: webPatientData?.patientInfo?.email || 'N/A',
            serviceName: appt.selectedService?.serviceName || 'N/A',
            servicePrice: appt.selectedService?.price || 0,
            appointmentStartDateTime: appt.selectedSlot?.startDateTime,
            appointmentEndDateTime: appt.selectedSlot?.endDateTime,
            method: 'Online',
            address: webPatientData?.patientInfo?.address || 'N/A',
            emergencyContact: webPatientData?.patientInfo?.emergencyContact || 'N/A',
            bloodGroup: webPatientData?.patientInfo?.bloodGroup || 'N/A',
            gender: webPatientData?.patientInfo?.gender || 'N/A',
            createdAt: appt.createdAt || new Date().toISOString(),
            updatedAt: appt.createdAt || new Date().toISOString(),
            status: 'Confirmed',
            source: 'Web',
            appointmentSlotId: appt.selectedSlot?._id || 'N/A',
            serviceId: appt.selectedService?._id || 'N/A'
          });
        });
      }

      if (profileData && profileData.serviceName) {
        allAppointments.push({
          _id: profileData._id || `profile_${Date.now()}`,
          fullName: profileData.fullName || 'N/A',
          email: profileData.email || 'N/A',
          serviceName: profileData.serviceName || 'N/A',
          servicePrice: profileData.servicePrice || 0,
          appointmentStartDateTime: profileData.appointmentStartDateTime,
          appointmentEndDateTime: profileData.appointmentEndDateTime,
          method: profileData.method || 'N/A',
          address: profileData.address || 'N/A',
          emergencyContact: profileData.emergencyContact || 'N/A',
          bloodGroup: profileData.bloodGroup || 'N/A',
          gender: profileData.gender || 'N/A',
          createdAt: profileData.createdAt || new Date().toISOString(),
          updatedAt: profileData.createdAt || new Date().toISOString(),
          status: profileData.status || 'Scheduled',
          source: 'Profile',
          appointmentSlotId: profileData.appointmentSlotId || 'N/A',
          serviceId: profileData.serviceId || 'N/A'
        });
      }

      return <PatientAppointment appointmentData={allAppointments} />;
    case 5:
      return (
        <PatientImages
          medicalRecords={medicalRecords}
          webPatientAttachments={attachments}
          token={localStorage.getItem("token")}
        />
      );
    case 6:
      return isOtpValid ? <DentalChart /> : null;
    case 8:
      return (
        <HealthInfomation
          patientId={id}
          setHealthInfoData={() => {}}
        />
      );
    case 9:
      return (
        <PatientDetails
          medicalRecords={medicalRecords}
          profileData={profileData}
          webPatientData={webPatientData}
          InvoiceData={InvoiceData}
          healthInfoData={healthInfoData}
          onUpdateMedicalRecord={onUpdateMedicalRecord}
          onUpdateInvoice={onUpdateInvoice}
          onUpdateHealthInfo={onUpdateHealthInfo}
        />
      );
    default:
      return null;
  }
};
