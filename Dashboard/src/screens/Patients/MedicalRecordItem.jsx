import React from "react";
import { FiEye, FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';

export const MedicalRecordItem = ({
  record,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className="bg-white border border-border hover:shadow-md rounded-2xl p-6 transition-all duration-300 flex flex-col gap-4 relative overflow-hidden shadow-sm"
    >
      {/* Top Accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-subMain/40"></div>

      {/* Header Info Block */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-subMain/10 text-subMain rounded-xl flex items-center justify-center text-lg shadow-sm">
            📁
          </div>
          <div>
            <h3 className="font-semibold text-main text-sm">Medical Record visit</h3>
            <p className="text-[10px] text-textGray">
              {new Date(record.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
            Tsh {record.amount || '0'}
          </span>
          
          <div className="flex gap-1.5">
            <button
              onClick={onView}
              title="View Record"
              className="p-2.5 bg-blue-50 text-subMain hover:bg-subMain hover:text-white rounded-xl border border-blue-100/50 transition duration-200 text-xs shadow-sm"
            >
              <FiEye />
            </button>
            <button
              onClick={onEdit}
              title="Edit Record"
              className="p-2.5 bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white rounded-xl border border-amber-100/50 transition duration-200 text-xs shadow-sm"
            >
              <FiEdit />
            </button>
            <button
              onClick={onDelete}
              title="Delete Record"
              className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl border border-rose-100/50 transition duration-200 text-xs shadow-sm"
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        </div>
      </div>

      {/* Grid content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
        <div className="space-y-1">
          <span className="text-[10px] font-semibold text-textGray uppercase tracking-wider">Complaint</span>
          <p className="text-xs text-main font-medium leading-relaxed">
            {record.complaint || '-'}
          </p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-semibold text-textGray uppercase tracking-wider">Diagnosis</span>
          <p className="text-xs text-main font-medium leading-relaxed">
            {record.diagnosis || '-'}
          </p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-semibold text-textGray uppercase tracking-wider">Treatment</span>
          <p className="text-xs text-main font-medium leading-relaxed">
            {record.treatment || '-'}
          </p>
        </div>
      </div>

      {/* Prescription / Vital sections */}
      {(record.vitalSigns || (record.medicineDosage && record.medicineDosage.length > 0)) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-50 bg-dry/30 rounded-xl p-4 mt-2">
          {record.vitalSigns && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-textGray uppercase tracking-wider">Vital Signs</span>
              <p className="text-xs text-main font-medium leading-relaxed bg-white border border-border/60 rounded-lg p-2.5 shadow-sm">
                {record.vitalSigns}
              </p>
            </div>
          )}
          {record.medicineDosage && record.medicineDosage.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-textGray uppercase tracking-wider">Prescribed Medicine</span>
              <div className="bg-white border border-border/60 rounded-lg p-2.5 shadow-sm space-y-1.5">
                {record.medicineDosage.map((med, idx) => (
                  <div key={med._id || idx} className="flex justify-between items-center text-xs border-b border-gray-50 last:border-0 pb-1.5 last:pb-0">
                    <span className="font-semibold text-main">{med.name}</span>
                    <span className="text-textGray text-[10px] bg-dry px-2 py-0.5 rounded-full font-medium">
                      {med.dosage} | {med.instrucation}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
