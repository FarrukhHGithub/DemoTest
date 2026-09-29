import React from "react";
import dayjs from "dayjs";
import { Tag } from "antd";

export const medicalRecordColumns = [
  {
    title: "S.No",
    dataIndex: "index",
    key: "index",
    width: 60,
    align: "center",
    render: (_, __, index) => <span className="font-semibold text-gray-500">{index + 1}</span>,
  },
  {
    title: "Complaints",
    dataIndex: "complaints",
    key: "complaints",
    width: 160,
    ellipsis: true,
    render: (complaints) => {
      if (!complaints || !Array.isArray(complaints) || complaints.length === 0) return "-";
      return complaints.map((c, i) => (
        <Tag key={i} color="blue" style={{ borderRadius: "4px", fontSize: "11.5px" }}>
          {c}
        </Tag>
      ));
    },
  },
  {
    title: "Diagnosis",
    dataIndex: "diagnosis",
    key: "diagnosis",
    width: 180,
    ellipsis: true,
    render: (diagnosis) =>
      diagnosis ? (
        <span className="font-medium text-slate-800">{diagnosis}</span>
      ) : (
        <span className="text-gray-400">-</span>
      ),
  },
  {
    title: "Treatment",
    dataIndex: "treatment",
    key: "treatment",
    width: 160,
    ellipsis: true,
    render: (treatment) => {
      if (!treatment || !Array.isArray(treatment) || treatment.length === 0) return "-";
      return treatment.map((t, i) => (
        <Tag key={i} color="cyan" style={{ borderRadius: "4px", fontSize: "11.5px" }}>
          {t.name || t}
        </Tag>
      ));
    },
  },
  {
    title: "Vital Signs",
    dataIndex: "vitalSigns",
    key: "vitalSigns",
    width: 140,
    ellipsis: true,
    render: (vitalSigns) => {
      if (!vitalSigns || !Array.isArray(vitalSigns) || vitalSigns.length === 0) return "-";
      return vitalSigns.map((v, i) => (
        <Tag key={i} color="purple" style={{ borderRadius: "4px", fontSize: "11px" }}>
          {v}
        </Tag>
      ));
    },
  },
  {
    title: "Prescription",
    dataIndex: "prescription",
    key: "prescription",
    width: 280,
    ellipsis: true,
    render: (prescription) => {
      if (!prescription) return <span className="text-gray-400">-</span>;

      if (prescription.medicines && Array.isArray(prescription.medicines) && prescription.medicines.length > 0) {
        return prescription.medicines
          .map((p) => {
            const parts = [p.name];
            if (p.dosage) parts.push(`Dosage: ${p.dosage}`);
            if (p.quantity) parts.push(`Qty: ${p.quantity}`);
            if (p.instructions) parts.push(`Instructions: ${p.instructions}`);
            if (p.amount) parts.push(`$${p.amount}`);
            return parts.join(" | ");
          })
          .join("; ");
      }

      if (Array.isArray(prescription) && prescription.length > 0) {
        return prescription
          .map((p) => {
            const parts = [p.name];
            if (p.dosage) parts.push(`Dosage: ${p.dosage}`);
            if (p.quantity) parts.push(`Qty: ${p.quantity}`);
            if (p.instructions) parts.push(`Instructions: ${p.instructions}`);
            if (p.amount) parts.push(`$${p.amount}`);
            return parts.join(" | ");
          })
          .join("; ");
      }

      return <span className="text-gray-400">-</span>;
    },
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 120,
    align: "center",
    render: (date) =>
      date ? <span className="text-xs text-slate-600 font-medium">{dayjs(date).format("DD MMM YYYY")}</span> : "-",
  },
];

// Define columns for rendering profile data
export const renderProfileDataColumns = [
  {
    title: "Full Name",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Blood Group",
    dataIndex: "bloodGroup",
    key: "bloodGroup",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Emergency Contact",
    dataIndex: "emergencyContact",
    key: "emergencyContact",
  },
];

// Define columns for rendering web patient data
export const renderWebPatientDataColumns = [
  {
    title: "Full Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Blood Group",
    dataIndex: "bloodGroup",
    key: "bloodGroup",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Emergency Contact",
    dataIndex: "emergencyContact",
    key: "emergencyContact",
  },
];

// Define columns for rendering invoice data
const invoiceStatusColors = {
  paid: "green",
  pending: "orange",
  overdue: "red",
  cancelled: "default",
};

export const invoiceColumns = [
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag color={invoiceStatusColors[status?.toLowerCase()] || "default"} className="capitalize font-semibold">
        {status || "-"}
      </Tag>
    ),
  },
  {
    title: "Created Date",
    dataIndex: "createdDate",
    key: "createdDate",
    render: (text) => (text ? dayjs(text).format("DD MMM YYYY") : "-"),
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    key: "dueDate",
    render: (text) => (text ? dayjs(text).format("DD MMM YYYY") : "-"),
  },
  {
    title: "Patient Name",
    dataIndex: ["patient", "fullName"],
    key: "patientName",
    render: (text) => text || "-",
  },
  {
    title: "Patient Email",
    dataIndex: ["patient", "email"],
    key: "patientEmail",
    render: (text) => text || "-",
  },
  {
    title: "Invoice Items",
    dataIndex: "invoiceItems",
    key: "invoiceItems",
    width: 260,
    render: (invoiceItems) => {
      if (!invoiceItems || !Array.isArray(invoiceItems) || invoiceItems.length === 0) return "-";
      return (
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="text-gray-500 text-left">
              <th className="pr-2 pb-1 font-medium">Item</th>
              <th className="pr-2 pb-1 font-medium text-right">Qty</th>
              <th className="pr-2 pb-1 font-medium text-right">Price</th>
              <th className="pb-1 font-medium text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {invoiceItems.map((item) => (
              <tr key={item._id || item.name}>
                <td className="pr-2 py-0.5">{item.name || "-"}</td>
                <td className="pr-2 py-0.5 text-right">{item.quantity}</td>
                <td className="pr-2 py-0.5 text-right">${item.price}</td>
                <td className="py-0.5 text-right font-semibold text-slate-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    },
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    align: "right",
    render: (total) => <span className="font-bold text-slate-900">${total ?? "-"}</span>,
  },
];

// Define columns for health info
export const healthInfoColumns = [
  {
    title: "S.No",
    dataIndex: "index",
    key: "index",
    width: 60,
    align: "center",
    render: (_, __, index) => <span className="font-semibold text-gray-500">{index + 1}</span>,
  },
  {
    title: "Blood Type",
    dataIndex: "bloodType",
    key: "bloodType",
    width: 110,
    align: "center",
    render: (bloodType) =>
      bloodType ? (
        <Tag color="volcano" style={{ fontWeight: "700", borderRadius: "6px" }}>
          {bloodType}
        </Tag>
      ) : (
        "-"
      ),
  },
  {
    title: "Height (cm)",
    dataIndex: "height",
    key: "height",
    width: 110,
    align: "center",
    render: (height) => (height ? <span className="font-medium">{height} cm</span> : "-"),
  },
  {
    title: "Weight (kg)",
    dataIndex: "weight",
    key: "weight",
    width: 110,
    align: "center",
    render: (weight) => (weight ? <span className="font-medium">{weight} kg</span> : "-"),
  },
  {
    title: "Allergies",
    dataIndex: "allergies",
    key: "allergies",
    width: 150,
    ellipsis: true,
    render: (allergies) =>
      allergies ? (
        <Tag color="magenta" style={{ borderRadius: "4px" }}>
          {allergies}
        </Tag>
      ) : (
        "-"
      ),
  },
  {
    title: "Habits",
    dataIndex: "habits",
    key: "habits",
    width: 150,
    ellipsis: true,
    render: (habits) => (habits ? <span className="text-slate-700 font-medium">{habits}</span> : "-"),
  },
  {
    title: "Medical History",
    dataIndex: "medicalHistory",
    key: "medicalHistory",
    width: 200,
    ellipsis: true,
    render: (medicalHistory) => (medicalHistory ? <span className="text-slate-700">{medicalHistory}</span> : "-"),
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 120,
    align: "center",
    render: (date) =>
      date ? <span className="text-xs text-slate-600 font-medium">{dayjs(date).format("DD MMM YYYY")}</span> : "-",
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
    width: 120,
    align: "center",
    render: (date) =>
      date ? <span className="text-xs text-slate-600 font-medium">{dayjs(date).format("DD MMM YYYY")}</span> : "-",
  },
];