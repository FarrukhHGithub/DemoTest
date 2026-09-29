import React, { useState } from "react";
import { Table, Button, Space, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { healthInfoColumns } from "./columns";
import { EditModal } from "../EditModal";
import BASE_URL from "../../../baseUrl.jsx";
import axios from "axios";

const HealthInfoSection = ({ healthInfoData, onUpdate, onRefresh, patientId }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setEditModalVisible(true);
  };

  // Helper function to get auth token
  const getAuthToken = () => {
    return localStorage.getItem('token') || localStorage.getItem('accessToken') || sessionStorage.getItem('token');
  };

  const handleSave = async (values) => {
    // Get patientId from props or from selected record
    const id = patientId || selectedRecord?.patientId || selectedRecord?.patient?._id;
    
    if (!id) {
      message.error("Patient ID is required");
      return;
    }

    setLoading(true);
    try {
      const updatedData = {
        bloodType: values.bloodType || '',
        height: values.height ? parseFloat(values.height) : 0,
        weight: values.weight ? parseFloat(values.weight) : 0,
        allergies: values.allergies || '',
        habits: values.habits || '',
        medicalHistory: values.medicalHistory || ''
      };

      // Get token
      const token = getAuthToken();
      
      // Prepare headers with authentication
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      let response;
      
      // Check if we're updating or creating
      if (selectedRecord?._id) {
        // Update existing health info
        response = await axios.put(
          `${BASE_URL}/api/health-information/${id}`,
          updatedData,
          { headers }
        );
      } else {
        // Create new health info
        response = await axios.post(
          `${BASE_URL}/api/health-information`,
          { ...updatedData, patientId: id },
          { headers }
        );
      }

      if (response.data.success) {
        message.success(
          selectedRecord?._id 
            ? "Health information updated successfully!" 
            : "Health information added successfully!"
        );
        setEditModalVisible(false);
        setSelectedRecord(null);
        onRefresh(); // Refresh the data
      } else {
        throw new Error(response.data.message || 'Operation failed');
      }
    } catch (error) {
      // Handle specific error cases
      if (error.response) {
        // Server responded with error
        if (error.response.status === 401) {
          message.error("Session expired. Please login again.");
          // Optional: Redirect to login
          // window.location.href = '/login';
        } else if (error.response.status === 403) {
          message.error("You don't have permission to perform this action.");
        } else if (error.response.status === 404) {
          message.error("Health information not found.");
        } else {
          message.error("Failed to update health information: " + (error.response.data?.message || error.message));
        }
      } else if (error.request) {
        // No response from server
        message.error("Failed to update health information: No response from server. Please check your connection.");
      } else {
        // Request setup error
        message.error("Failed to update health information: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditModalVisible(false);
    setSelectedRecord(null);
  };

  // Updated columns with better alignment - only edit button in actions
  const columnsWithActions = [
    ...healthInfoColumns.map(col => ({
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

  const healthInfoFields = [
    {
      name: "bloodType",
      label: "Blood Type",
      type: "select",
      options: [
        { value: "A+", label: "A+" },
        { value: "A-", label: "A-" },
        { value: "B+", label: "B+" },
        { value: "B-", label: "B-" },
        { value: "AB+", label: "AB+" },
        { value: "AB-", label: "AB-" },
        { value: "O+", label: "O+" },
        { value: "O-", label: "O-" },
      ],
      rules: [{ required: true, message: "Please select blood type" }]
    },
    {
      name: "height",
      label: "Height (cm)",
      type: "number",
      rules: [{ required: true, message: "Please enter height" }]
    },
    {
      name: "weight",
      label: "Weight (kg)",
      type: "number",
      rules: [{ required: true, message: "Please enter weight" }]
    },
    {
      name: "allergies",
      label: "Allergies",
      type: "textarea",
      rows: 3
    },
    {
      name: "habits",
      label: "Habits",
      type: "textarea",
      rows: 3
    },
    {
      name: "medicalHistory",
      label: "Medical History",
      type: "textarea",
      rows: 4,
      rules: [{ required: true, message: "Please enter medical history" }]
    }
  ];

  return (
    <div className="patient-details-section">
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title m-0">Health Information</h2>
      </div>
      
      {healthInfoData && healthInfoData.length > 0 ? (
        <div className="overflow-x-auto">
          <Table
            dataSource={healthInfoData}
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
            rowClassName={() => 'health-info-row'}
          />
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400">
          <p className="m-0">No health information found.</p>
        </div>
      )}

      <EditModal
        visible={editModalVisible}
        onCancel={handleCancel}
        onSave={handleSave}
        title={selectedRecord?._id ? "Edit Health Information" : "Add Health Information"}
        data={selectedRecord || {}}
        fields={healthInfoFields}
        loading={loading}
      />
    </div>
  );
};

export default HealthInfoSection;