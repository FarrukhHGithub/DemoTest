import React, { useState } from 'react';
import Modal from './Modal';
import { FiEye } from 'react-icons/fi';
import { MedicineDosageTable } from '../../components/Tables';
import axios from 'axios';
import BASE_URL from '../../baseUrl.jsx';

function MedicalRecodModal({ closeModal, isOpen, data, }) {
  const { prescription, attachments, complaints, diagnosis, vitalSigns, treatment } = data;
  const [showMedicineDosages, setShowMedicineDosages] = useState(false);
  const medicineDosages = prescription ? prescription.medicines : [];

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      data={data}
      title={new Date(data.createdAt).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' })}
      width="max-w-4xl"
    >
      <div className="space-y-4 text-left">
        {/* Prescriptions */}
        {medicineDosages.length > 0 && (
          <div className="grid grid-cols-12 gap-4 w-full py-4 border-b border-slate-100 items-start">
            <div className="col-span-12 md:col-span-3">
              <p className="text-sm font-semibold text-slate-500">Prescriptions</p>
              <button
                type="button"
                onClick={() => setShowMedicineDosages(!showMedicineDosages)}
                className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-subMain hover:text-opacity-80 transition-colors"
              >
                <FiEye className="text-sm" />
                {showMedicineDosages ? "Hide Dosages" : "Show Dosages"}
              </button>
            </div>
            <div className="col-span-12 md:col-span-9">
              {showMedicineDosages ? (
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 overflow-hidden">
                  <MedicineDosageTable data={medicineDosages} />
                </div>
              ) : (
                <div className="text-sm text-slate-500 italic py-2">Dosages are hidden. Click "Show Dosages" to view.</div>
              )}
            </div>
          </div>
        )}

        {/* Attachments */}
        <div className="grid grid-cols-12 gap-4 w-full py-4 border-b border-slate-100 items-start">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-semibold text-slate-500">Attachments</p>
          </div>
          <div className="col-span-12 md:col-span-9 border border-slate-100 bg-slate-50/30 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {attachments && attachments.length > 0 ? (
              attachments.map((attachment, index) => {
                const imageUrl = `${BASE_URL}/uploads/${attachment.filename}`;
                return (
                  <div key={index} className="group relative rounded-lg overflow-hidden border border-slate-200 bg-white aspect-square shadow-sm hover:shadow-md transition-all duration-200">
                    <img
                      src={imageUrl}
                      alt={attachment.originalname}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-400 col-span-full py-2">No attachments available</p>
            )}
          </div>
        </div>

        {/* Complaints */}
        {complaints && (
          <div className="grid grid-cols-12 gap-4 w-full py-4 border-b border-slate-100 items-start">
            <div className="col-span-12 md:col-span-3">
              <p className="text-sm font-semibold text-slate-500">Complaints</p>
            </div>
            <div className="col-span-12 md:col-span-9 text-slate-800 text-sm bg-slate-50/50 rounded-xl p-4 border border-slate-100 leading-relaxed">
              {complaints}
            </div>
          </div>
        )}

        {/* Diagnosis */}
        {diagnosis && (
          <div className="grid grid-cols-12 gap-4 w-full py-4 border-b border-slate-100 items-start">
            <div className="col-span-12 md:col-span-3">
              <p className="text-sm font-semibold text-slate-500">Diagnosis</p>
            </div>
            <div className="col-span-12 md:col-span-9 text-slate-800 text-sm bg-slate-50/50 rounded-xl p-4 border border-slate-100 leading-relaxed">
              {diagnosis}
            </div>
          </div>
        )}

        {/* Vital Signs */}
        {vitalSigns && (
          <div className="grid grid-cols-12 gap-4 w-full py-4 border-b border-slate-100 items-start">
            <div className="col-span-12 md:col-span-3">
              <p className="text-sm font-semibold text-slate-500">Vital Signs</p>
            </div>
            <div className="col-span-12 md:col-span-9 text-slate-800 text-sm bg-slate-50/50 rounded-xl p-4 border border-slate-100 leading-relaxed">
              {vitalSigns}
            </div>
          </div>
        )}

        {/* Treatment */}
        {treatment && (
          <div className="grid grid-cols-12 gap-4 w-full py-4 items-start">
            <div className="col-span-12 md:col-span-3">
              <p className="text-sm font-semibold text-slate-500">Treatment</p>
            </div>
            <div className="col-span-12 md:col-span-9 text-slate-800 text-sm bg-slate-50/50 rounded-xl p-4 border border-slate-100 leading-relaxed">
              {treatment}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default MedicalRecodModal;
