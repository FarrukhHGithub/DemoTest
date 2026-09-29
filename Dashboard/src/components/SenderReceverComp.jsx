import React, { useState, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import axios from "axios";
import BASE_URL from '../baseUrl.jsx';

function SenderReceverComp({
  item,
  functions,
  button,
  selectedPatient,
  handleSelectPatient
}) {
  const [patients, setPatients] = useState([]);
  const [showPatients, setShowPatients] = useState(false);

  useEffect(() => {
    if (showPatients) {
      fetchPatients();
    }
  }, [showPatients]);

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/patients`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const uniquePatients = [];
      const seenKeys = new Set();
      response.data.forEach((patient) => {
        if (patient.isArchived !== true) {
          const key = patient.email 
            ? patient.email.toLowerCase().trim() 
            : patient._id;
          if (key && !seenKeys.has(key)) {
            seenKeys.add(key);
            uniquePatients.push(patient);
          }
        }
      });
      setPatients(uniquePatients);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleAddButtonClick = () => {
    setShowPatients(true); // Show patients when "Add" button is clicked
  };

  const handlePatientSelect = (patient) => {
    handleSelectPatient(patient);
    setShowPatients(false); // Hide patients after selecting one
  };

  return (
    <div className="grid sm:grid-cols-2 gap-4 items-center mt-3">
      <div className="border border-border rounded-xl p-3.5 sm:p-4">
        <div className="flex-btn gap-2">
          <h1 className="text-xs font-bold text-slate-800">From:</h1>
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <h6 className="text-xs font-bold text-main">Dr Fayaz Clinic</h6>
          <p className="text-[11px] text-textGray">drfayaz@gmail.com</p>
          <p className="text-[11px] text-textGray">+ (92) 345,1111111</p>
        </div>
      </div>
      <div className="border border-border rounded-xl p-3.5 sm:p-4">
        <div className="flex-btn gap-2">
          <h1 className="text-xs font-bold text-slate-800">To:</h1>
          {button && (
            <button
              onClick={handleAddButtonClick}
              className="bg-dry text-subMain flex items-center gap-1 rounded-lg border border-border py-1 px-3 text-xs font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <BiPlus /> Add
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {showPatients ? (
            patients.map((patient) => {


              return (
                <div
                  key={patient._id} // Assuming _id is the unique identifier for the patient
                  className="cursor-pointer"
                  onClick={() => handlePatientSelect(patient)}
                >
                  <h6 className="text-xs font-medium">{patient.fullName}</h6>
                  <p className="text-xs text-textGray">Email: {patient.email}</p>
                  <p className="text-xs text-textGray">Phone: {patient.emergencyContact}</p>
                </div>
              );
            })
          ) : selectedPatient ? (
            <>
              <h6 className="text-xs font-medium">{selectedPatient.fullName}</h6>
              <p className="text-xs text-textGray">Email: {selectedPatient.email}</p>
              <p className="text-xs text-textGray">Phone: {selectedPatient.emergencyContact}</p>
            </>
          ) : (
            <>
              <h6 className="text-xs font-medium">{item?.title}</h6>
              <p className="text-xs text-textGray">{item?.email}</p>
              <p className="text-xs text-textGray">{item?.phone}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SenderReceverComp;
