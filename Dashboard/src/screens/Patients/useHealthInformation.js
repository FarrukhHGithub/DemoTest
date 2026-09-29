import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { sortsDatas } from "../../components/Datas";
import { toast } from "react-hot-toast";
import BASE_URL from "../../baseUrl.jsx";

export function useHealthInformation(patientId, setHealthInfoData) {
  const [healthRecords, setHealthRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  
  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  // Form fields state
  const [bloodType, setBloodType] = useState(sortsDatas.bloodTypeFilter[0]);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [allergies, setAllergies] = useState('');
  const [habits, setHabits] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');

  const fetchHealthRecords = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/api/health-information/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = response.data || [];
      setHealthRecords(data);
      if (setHealthInfoData) {
        setHealthInfoData(data);
      }
    } catch (error) {
      console.error('Error fetching health records:', error);
      toast.error('Failed to load health information');
    }
  }, [patientId, setHealthInfoData]);

  useEffect(() => {
    fetchHealthRecords();
  }, [fetchHealthRecords]);

  const handleAddClick = useCallback(() => {
    setBloodType(sortsDatas.bloodTypeFilter[0]);
    setWeight('');
    setHeight('');
    setAllergies('');
    setHabits('');
    setMedicalHistory('');
    setIsAddOpen(true);
  }, []);

  const handleEditClick = useCallback((record) => {
    setSelectedRecord(record);
    const matchedBloodType = sortsDatas.bloodTypeFilter.find(b => b.name === record.bloodType) || sortsDatas.bloodTypeFilter[0];
    setBloodType(matchedBloodType);
    setWeight(record.weight || '');
    setHeight(record.height || '');
    setAllergies(record.allergies || '');
    setHabits(record.habits || '');
    setMedicalHistory(record.medicalHistory || '');
    setIsEditOpen(true);
  }, []);

  const handleCreateSubmit = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${BASE_URL}/api/health-information`,
        {
          patientId,
          bloodType: bloodType.name,
          weight,
          height,
          allergies,
          habits,
          medicalHistory,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Health information saved successfully');
      setIsAddOpen(false);
      fetchHealthRecords();
    } catch (error) {
      console.error('Error saving health information:', error);
      toast.error('Error saving health information');
    }
  }, [patientId, bloodType, weight, height, allergies, habits, medicalHistory, fetchHealthRecords]);

  const handleEditSubmit = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${BASE_URL}/api/health-information/${patientId}`,
        {
          bloodType: bloodType.name,
          weight,
          height,
          allergies,
          habits,
          medicalHistory,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Health information updated successfully');
      setIsEditOpen(false);
      fetchHealthRecords();
    } catch (error) {
      console.error('Error updating health information:', error);
      toast.error('Error updating health information');
    }
  }, [patientId, bloodType, weight, height, allergies, habits, medicalHistory, fetchHealthRecords]);

  const handleDelete = useCallback(async (pId) => {
    if (window.confirm('Are you sure you want to delete this health record?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${BASE_URL}/api/health-information/${pId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Health information deleted successfully');
        fetchHealthRecords();
      } catch (error) {
        console.error('Error deleting health information:', error);
        toast.error('Failed to delete health information');
      }
    }
  }, [fetchHealthRecords]);

  return {
    healthRecords,
    selectedRecord,
    setSelectedRecord,
    isAddOpen,
    setIsAddOpen,
    isEditOpen,
    setIsEditOpen,
    isViewOpen,
    setIsViewOpen,
    bloodType,
    setBloodType,
    weight,
    setWeight,
    height,
    setHeight,
    allergies,
    setAllergies,
    habits,
    setHabits,
    medicalHistory,
    setMedicalHistory,
    handleAddClick,
    handleEditClick,
    handleCreateSubmit,
    handleEditSubmit,
    handleDelete,
  };
}
