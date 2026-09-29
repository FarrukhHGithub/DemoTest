import React, { useState } from "react";
import { Table, Button, Space, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { medicalRecordColumns } from "./columns";
import EditMedicalRecordModal from "./EditMedicalRecordModal";
import BASE_URL from "../../../baseUrl.jsx";
import axios from "axios";

const MedicalRecordsSection = ({ medicalRecords, onUpdate, onRefresh }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = (record) => {
    console.log("Original record:", record);
    
    // Transform data for the edit modal
    const transformedRecord = {
      _id: record._id,
      patient: record.patient,
      complaints: Array.isArray(record.complaints) 
        ? record.complaints.map(c => typeof c === 'string' ? c : c.complaint || '')
        : [],
      diagnosis: record.diagnosis || '',
      treatment: Array.isArray(record.treatment) 
        ? record.treatment.map(t => t.name || '')
        : [],
      vitalSigns: Array.isArray(record.vitalSigns) 
        ? record.vitalSigns.map(v => typeof v === 'string' ? v : v.sign || '')
        : [],
      // Fix: Keep prescription as array of objects with all fields
      prescription: Array.isArray(record.prescription?.medicines) 
        ? record.prescription.medicines.map(m => ({
            name: m.name || '',
            dosage: m.dosage || '',
            quantity: m.quantity || 0,
            instructions: m.instructions || '',
            amount: m.amount || 0,
            itemPrice: m.itemPrice || 0
          }))
        : []
    };
    
    console.log("Transformed record:", transformedRecord);
    setSelectedRecord(transformedRecord);
    setEditModalVisible(true);
  };

  const getAuthToken = () => {
    return localStorage.getItem('token') || localStorage.getItem('accessToken') || sessionStorage.getItem('token');
  };

  const handleSave = async (values) => {
    const id = selectedRecord?._id;
    
    if (!id) {
      message.error("No record selected for update");
      return;
    }

    setLoading(true);
    try {
      // Transform data for API
      const updatedData = {
        complaints: Array.isArray(values.complaints) 
          ? values.complaints.filter(c => c?.trim()).map(c => c.trim())
          : [],
        diagnosis: values.diagnosis?.trim() || '',
        treatment: Array.isArray(values.treatment) 
          ? values.treatment.filter(t => t?.trim()).map(t => ({
              name: t.trim(),
              checked: true
            }))
          : [],
        vitalSigns: Array.isArray(values.vitalSigns) 
          ? values.vitalSigns.filter(v => v?.trim()).map(v => v.trim())
          : [],
        prescription: {
          medicines: Array.isArray(values.prescription) 
            ? values.prescription.filter(p => p.name?.trim()).map(p => ({
                name: p.name.trim(),
                dosage: p.dosage?.trim() || '',
                quantity: p.quantity || 0,
                instructions: p.instructions?.trim() || '',
                itemPrice: p.amount || 0,
                amount: p.amount || 0
              }))
            : []
        }
      };

      const token = getAuthToken();
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios.put(
        `${BASE_URL}/api/medical-records/${id}`,
        updatedData,
        { headers }
      );

      if (response.data.success || response.data.message) {
        message.success("Medical record updated successfully!");
        setEditModalVisible(false);
        setSelectedRecord(null);
        onRefresh();
      } else {
        throw new Error(response.data.message || 'Update failed');
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApiError = (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        message.error("Session expired. Please login again.");
      } else if (error.response.status === 403) {
        message.error("You don't have permission to perform this action.");
      } else if (error.response.status === 404) {
        message.error("Medical record not found.");
      } else {
        message.error("Failed to update medical record: " + (error.response.data?.message || error.message));
      }
    } else if (error.request) {
      message.error("Failed to update medical record: No response from server. Please check your connection.");
    } else {
      message.error("Failed to update medical record: " + error.message);
    }
  };

  const handleCancel = () => {
    setEditModalVisible(false);
    setSelectedRecord(null);
  };

  // Columns with actions
  const columnsWithActions = [
    ...medicalRecordColumns.map(col => ({
      ...col,
      align: col.align || 'left',
      ellipsis: col.ellipsis !== undefined ? col.ellipsis : true,
    })),
    {
      title: "Actions",
      key: "actions",
      align: 'center',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
            size="small"
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="patient-details-section">
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title m-0">Medical Records</h2>
      </div>
      
      {medicalRecords?.success && medicalRecords?.data?.length > 0 ? (
        <div className="overflow-x-auto">
          <Table
            dataSource={medicalRecords.data}
            columns={columnsWithActions}
            pagination={{
              pageSize: 5,
              showSizeChanger: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} records`,
            }}
            rowKey="_id"
            bordered
            size="middle"
            scroll={{ x: 'max-content' }}
            rowClassName={() => 'medical-record-row'}
          />
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400">
          <p className="m-0">No medical records found.</p>
        </div>
      )}

      <EditMedicalRecordModal
        visible={editModalVisible}
        onCancel={handleCancel}
        onSave={handleSave}
        record={selectedRecord}
        loading={loading}
      />
    </div>
  );
};

export default MedicalRecordsSection;