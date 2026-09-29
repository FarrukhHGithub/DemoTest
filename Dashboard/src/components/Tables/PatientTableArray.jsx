import React from "react";

export function PatientTableArray({ data, onEdit }) {
  if (!Array.isArray(data)) {
    console.error("Data is not an array:", data);
    return <div>Error: Data is not an array</div>;
  }

  const thClass = "text-start text-sm font-medium py-3 px-1 whitespace-nowrap";
  const tdClass = "text-start text-xs py-4 px-2 whitespace-nowrap";

  return (
    <div className="w-full overflow-x-auto">
      <table className="table-auto w-full">
        <thead className="bg-gray-200 rounded-md overflow-hidden">
          <tr>
            <th className={thClass} style={{ width: "5%" }}>
              #
            </th>
            <th className={thClass} style={{ width: "8%" }}>
              Full Name
            </th>
            <th className={thClass} style={{ width: "8%" }}>
              Gender
            </th>
            <th className={thClass} style={{ width: "8%" }}>
              Email
            </th>
            <th className={thClass} style={{ width: "7%" }}>
              Blood Group
            </th>
            <th className={thClass} style={{ width: "10%" }}>
              Emergency Contact
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((patient, index) => (
            <tr
              key={patient._id}
              className="border-b border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <td className={tdClass}>{index + 1}</td>
              <td className={tdClass}>{patient.fullName}</td>
              <td className={tdClass}>{patient.gender}</td>
              <td className={tdClass}>{patient.email}</td>
              <td className={tdClass}>{patient.bloodGroup}</td>
              <td className={tdClass}>{patient.emergencyContact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
