import React, { useState, useEffect } from 'react';
import { Button } from '../../components/Form';
import { BiPlus } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import MedicalRecodModal from '../../components/Modals/MedicalRecodModal';
import EditMedicalRecordModal from './EditMedicalRecordModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { fetchMedicalRecords } from './fetch';
import BASE_URL from '../../baseUrl.jsx';
import { MedicalRecordItem } from './MedicalRecordItem';

function MedicalRecord() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchMedicalRecords(id, setMedicalRecords, toast);
  }, [id]);

  const handleDelete = async (recordId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${BASE_URL}/api/medical-records/${recordId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMedicalRecords(id, setMedicalRecords, toast);
      toast.success('Medical record deleted successfully');
    } catch (error) {
      console.error('Error deleting medical record:', error);
      toast.error('Failed to delete medical record');
    }
  };

  const handleEdit = async (recordId, newData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${BASE_URL}/api/medical-records/${recordId}`, newData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMedicalRecords(id, setMedicalRecords, toast); // Update medical records after editing
      toast.success('Medical record edited successfully');
    } catch (error) {
      console.error('Error editing medical record:', error);
      toast.error('Failed to edit medical record');
    }
  };

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <MedicalRecodModal
          closeModal={() => {
            setIsOpen(false);
          }}
          isOpen={isOpen}
          data={{ ...selectedData, id }}
          token={localStorage.getItem('token')}
        />
      )}
      {isEditOpen && (
        <EditMedicalRecordModal
          closeModal={() => setIsEditOpen(false)}
          isOpen={isEditOpen}
          selectedData={selectedData}
          handleEdit={(recordId, newData) => handleEdit(recordId, newData)}
        />
      )}
      <div id="tour-records" className="flex flex-col gap-6">
        <div className="flex-btn gap-4">
          <h1 className="text-sm font-semibold text-main sm:block hidden">Medical Records</h1>
          <div className="sm:w-1/4 w-full">
            <Button
              label="New Record"
              Icon={BiPlus}
              onClick={() => {
                navigate(`/patients/visiting/${id}`);
              }}
            />
          </div>
        </div>

        {/* Medical Records */}
        {medicalRecords.length === 0 ? (
          <div className="text-center py-12 bg-dry rounded-2xl border border-dashed border-border">
            <p className="text-sm text-textGray">No medical records found for this patient.</p>
          </div>
        ) : (
          medicalRecords.map((record) => (
            <MedicalRecordItem
              key={record._id || record.id}
              record={record}
              onView={() => {
                setIsOpen(true);
                setSelectedData(record);
              }}
              onEdit={() => {
                setIsEditOpen(true);
                setSelectedData(record);
              }}
              onDelete={() => handleDelete(record._id || record.id)}
            />
          ))
        )}
      </div>
    </>
  );
}

export default MedicalRecord;