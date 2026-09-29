import React from "react";
import { PatientRow } from "./PatientRow";
import { WebPatientRow } from "./WebPatientRow";
import { AppointmentPatientRow } from "./AppointmentPatientRow";

const thClass =
  "text-start text-xs font-semibold uppercase tracking-wider text-textGray py-3 px-4 border-b border-border bg-gray-50/70 whitespace-nowrap";

export function PatientTable({
  patients,
  webPatients,
  appointmentPatients,
  onDelete,
  onDeleteWebPatient,
  onDeleteAppointmentPatient,
  onEdit,
  onCheckPrevious,
}) {
  const filterUniqueEmails = (data) => {
    const uniqueEmails = new Set();
    return data.filter((item) => {
      if (!uniqueEmails.has(item.email)) {
        uniqueEmails.add(item.email);
        return true;
      }
      return false;
    });
  };

  const uniquePatients = filterUniqueEmails(patients || []);

  const uniqueWebPatients = (webPatients || []).filter(
    (patient, index, self) =>
      index ===
      self.findIndex((p) => p.patientInfo?.email === patient.patientInfo?.email)
  );

  const uniqueAppointmentPatients = filterUniqueEmails(
    appointmentPatients || []
  );

  const hasData =
    uniquePatients.length > 0 ||
    uniqueWebPatients.length > 0 ||
    uniqueAppointmentPatients.length > 0;

  if (!hasData) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No patients found</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thClass} style={{ width: "2%" }}>
              #
            </th>
            <th className={thClass} style={{ width: "1%" }}>
              Image
            </th>
            <th className={thClass} style={{ width: "5%" }}>
              Full Name
            </th>
            <th className={thClass} style={{ width: "5%" }}>
              Gender
            </th>
            <th className={thClass} style={{ width: "3%" }}>
              Blood Group
            </th>
            <th className={thClass} style={{ width: "5%" }}>
              Address
            </th>
            <th className={thClass} style={{ width: "5%" }}>
              Email
            </th>
            <th className={thClass} style={{ width: "5%" }}>
              Emergency Contact
            </th>
            <th className={thClass} style={{ width: "8%" }}>
              Appointment Details
            </th>
            <th className={thClass} style={{ width: "3%" }}>
              Status
            </th>
            <th className={thClass} style={{ width: "3%" }}>
              Method
            </th>
            <th className={thClass} style={{ width: "5%" }}>
              Created At
            </th>
            <th className={thClass} style={{ width: "3%" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Regular Patients */}
          {uniquePatients.map((item, index) => (
            <PatientRow
              key={item._id}
              item={item}
              index={index}
              onEdit={onEdit}
              onDelete={onDelete}
              onCheckPrevious={onCheckPrevious}
            />
          ))}

          {/* Web Patients */}
          {uniqueWebPatients.map((webPatient, index) => (
            <WebPatientRow
              key={webPatient._id}
              webPatient={webPatient}
              index={uniquePatients.length + index + 1}
              onDeleteWebPatient={onDeleteWebPatient}
            />
          ))}

          {/* Appointment Patients */}
          {uniqueAppointmentPatients.map((item, index) => (
            <AppointmentPatientRow
              key={item._id}
              item={item}
              index={uniquePatients.length + uniqueWebPatients.length + index + 1}
              onEdit={onEdit}
              onDeleteAppointmentPatient={onDeleteAppointmentPatient}
              onCheckPrevious={onCheckPrevious}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
