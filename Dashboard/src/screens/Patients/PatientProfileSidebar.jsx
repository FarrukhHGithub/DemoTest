import React from "react";
import { patientTab } from "../../components/Datas";

export function PatientProfileSidebar({
  profileData,
  webPatientData,
  activeTab,
  setActiveTab,
  handleMentalHealthTabClick,
  baseUrl,
}) {
  return (
    <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl border border-border p-4 sm:p-5 lg:sticky top-20 flex flex-col items-stretch shadow-sm">
      {profileData.fullName ? (
        <div className="flex flex-col items-center text-center pb-3 mb-3 border-b border-border w-full">
          <div className="relative">
            <img
              src={`${baseUrl}/${profileData.profilePicture}`}
              alt={profileData.fullName}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-xs ring-2 ring-subMain/20"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/64?text=User";
              }}
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <h2 className="text-xs font-bold text-main mt-2">
            {profileData.fullName}
          </h2>
          <p className="text-[11px] text-textGray font-medium mt-0.5">{profileData.email}</p>
          <div className="mt-2 flex items-center gap-1 bg-dry px-2 py-0.5 rounded-full text-[10px] text-main font-semibold border border-border">
            <span>📞</span> {profileData.emergencyContact || 'No Contact'}
          </div>
        </div>
      ) : null}

      {!profileData.fullName && webPatientData && webPatientData.patientInfo ? (
        <div className="flex flex-col items-center text-center pb-3 mb-3 border-b border-border w-full">
          <div className="relative">
            <img
              src={`${baseUrl}/${webPatientData.patientInfo.image}`}
              alt={webPatientData.patientInfo.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-xs ring-2 ring-subMain/20"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/64?text=User";
              }}
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <h2 className="text-xs font-bold text-main mt-2">
            {webPatientData.patientInfo.name}
          </h2>
          <p className="text-[11px] text-textGray font-medium mt-0.5">
            {webPatientData.patientInfo.email}
          </p>
          <div className="mt-2 flex items-center gap-1 bg-dry px-2 py-0.5 rounded-full text-[10px] text-main font-semibold border border-border">
            <span>📞</span> {webPatientData.patientInfo.emergencyContact || 'No Contact'}
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-1 w-full">
        {patientTab.map((tab, index) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              onClick={
                tab.id === 6
                  ? handleMentalHealthTabClick
                  : () => setActiveTab(tab.id)
              }
              key={index}
              className={`flex items-center gap-2.5 w-full py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 ${
                isActive
                  ? "bg-subMain/10 text-subMain border-l-4 border-subMain shadow-xs font-semibold"
                  : "text-main hover:bg-gray-50 border-l-4 border-transparent hover:text-subMain"
              }`}
            >
              <tab.icon className={`text-sm transition-colors ${isActive ? 'text-subMain' : 'text-gray-400'}`} />
              <span>{tab.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
