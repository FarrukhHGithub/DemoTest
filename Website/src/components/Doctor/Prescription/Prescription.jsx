import React, { useEffect, useState } from "react";
import { message, Table, Card, Tag, Space, Avatar, Statistic, Row, Col, Divider } from "antd";
import { 
  UserOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  EnvironmentOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  FileTextOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import axios from "axios";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import BASE_URL from '../../../baseUrl.jsx';

const Prescription = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [patientInfo, setPatientInfo] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await axios.get(
        `${BASE_URL}/api/web/web/${id}`,
        config
      );
      
      if (response.data && response.data.length > 0) {
        const patientData = response.data[0];
        setPatientInfo(patientData.patientInfo);
        setAppointments(patientData.appointments);
        
        const transformedData = [{
          key: patientData._id || patientData.patientInfo.id,
          patientName: patientData.patientInfo.name,
          patientGender: patientData.patientInfo.gender,
          patientBloodGroup: patientData.patientInfo.bloodGroup,
          patientEmail: patientData.patientInfo.email,
          patientContact: patientData.patientInfo.emergencyContact,
          patientAddress: patientData.patientInfo.address,
          patientImage: patientData.patientInfo.image,
          totalAppointments: patientData.appointments.length,
          appointments: patientData.appointments,
          status: patientData.status,
          method: patientData.method,
        }];
        
        setData(transformedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch appointment data");
    } finally {
      setLoading(false);
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'warning',
      'Completed': 'success',
      'Cancelled': 'danger',
      'Confirmed': 'primary'
    };
    return colors[status] || 'default';
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const colors = {
      'Pending': 'gold',
      'Completed': 'green',
      'Cancelled': 'red',
      'Confirmed': 'blue'
    };
    return colors[status] || 'default';
  };

  // Columns for appointments table
  const appointmentColumns = [
    {
      title: '#',
      key: 'index',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Service',
      dataIndex: 'selectedService',
      key: 'serviceName',
      render: (service) => (
        <Space>
          <FileTextOutlined style={{ color: '#1890ff' }} />
          <span style={{ fontWeight: 500 }}>{service?.serviceName || 'N/A'}</span>
        </Space>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'selectedService',
      key: 'price',
      render: (service) => (
        <Tag color="blue" icon={<DollarOutlined />}>
          ${service?.price || 0}
        </Tag>
      ),
      sorter: (a, b) => (a.selectedService?.price || 0) - (b.selectedService?.price || 0),
    },
    {
      title: 'Date & Time',
      key: 'datetime',
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <span>
            <CalendarOutlined style={{ marginRight: 4, color: '#1890ff' }} />
            {record.selectedSlot?.startDateTime ? dayjs(record.selectedSlot.startDateTime).format('MMM DD, YYYY') : 'N/A'}
          </span>
          <span style={{ fontSize: '12px', color: '#8c8c8c' }}>
            <ClockCircleOutlined style={{ marginRight: 4 }} />
            {record.selectedSlot?.startDateTime ? dayjs(record.selectedSlot.startDateTime).format('h:mm A') : 'N/A'} - 
            {record.selectedSlot?.endDateTime ? dayjs(record.selectedSlot.endDateTime).format('h:mm A') : 'N/A'}
          </span>
        </Space>
      ),
      sorter: (a, b) => {
        const dateA = a.selectedSlot?.startDateTime || '';
        const dateB = b.selectedSlot?.startDateTime || '';
        return dateA.localeCompare(dateB);
      },
    },
    {
      title: 'Booked On',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => (
        <span>
          {date ? dayjs(date).format('MMM DD, YYYY h:mm A') : 'N/A'}
        </span>
      ),
      sorter: (a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''),
    },
    {
      title: 'Status',
      key: 'status',
      render: () => (
        <Tag color={getStatusBadge('Pending')}>
          Pending
        </Tag>
      ),
    },
  ];

  // Render patient info card
  const renderPatientCard = () => {
    if (!patientInfo) return null;

    return (
      <div 
        id="tour-patient-card"
        style={{ 
          backgroundColor: "#ffffff", 
          borderRadius: "16px", 
          padding: "2rem", 
          boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
          border: "1px solid #f1f5f9",
          marginBottom: "1.5rem"
        }}
      >
        <Row gutter={[24, 16]} align="middle">
          <Col xs={24} sm={6} md={4} style={{ textAlign: 'center' }}>
            <Avatar
              size={100}
              src={patientInfo.image ? `${BASE_URL}/${patientInfo.image}` : null}
              icon={!patientInfo.image && <UserOutlined />}
              style={{ 
                backgroundColor: '#1890ff',
                border: '4px solid #e6f7ff',
                boxShadow: "0 4px 10px rgba(24,144,255,0.15)"
              }}
            />
            <div style={{ marginTop: 12 }}>
              <Tag color={getStatusBadge(patientInfo.status || 'Pending')} style={{ fontSize: '13px', padding: '4px 14px', borderRadius: '20px', fontWeight: '600' }}>
                {patientInfo.status || 'Pending'}
              </Tag>
            </div>
          </Col>
          
          <Col xs={24} sm={18} md={20}>
            <Row gutter={[16, 8]}>
              <Col xs={24}>
                <h3 style={{ margin: 0, fontWeight: 700, fontSize: '24px', color: '#0f172a' }}>
                  {patientInfo.name}
                </h3>
                <div style={{ color: '#8c8c8c', marginTop: 8, display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <Tag color="geekblue" style={{ borderRadius: '4px', fontWeight: '500' }}>
                    {patientInfo.gender?.charAt(0).toUpperCase() + patientInfo.gender?.slice(1)}
                  </Tag>
                  <Tag color="purple" style={{ borderRadius: '4px', fontWeight: '500' }}>
                    Blood: {patientInfo.bloodGroup}
                  </Tag>
                  <Tag color="cyan" style={{ borderRadius: '4px', fontWeight: '500' }}>
                    {patientInfo.method || 'Online'}
                  </Tag>
                </div>
              </Col>
            </Row>
            
            <Divider style={{ margin: '16px 0' }} />
            
            <Row gutter={[16, 12]}>
              <Col xs={24} sm={12} md={6}>
                <Space>
                  <MailOutlined style={{ color: '#1890ff' }} />
                  <span style={{ color: '#475569', fontSize: '13.5px' }}>{patientInfo.email}</span>
                </Space>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Space>
                  <PhoneOutlined style={{ color: '#1890ff' }} />
                  <span style={{ color: '#475569', fontSize: '13.5px' }}>{patientInfo.emergencyContact}</span>
                </Space>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Space>
                  <EnvironmentOutlined style={{ color: '#1890ff' }} />
                  <span style={{ color: '#475569', fontSize: '13.5px' }}>{patientInfo.address}</span>
                </Space>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Space>
                  <CalendarOutlined style={{ color: '#1890ff' }} />
                  <span style={{ color: '#475569', fontSize: '13.5px' }}>Total Appointments: <strong style={{ color: '#0f172a' }}>{appointments.length}</strong></span>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  };

  // Render statistics cards
  const renderStatistics = () => {
    if (!appointments.length) return null;

    const totalSpent = appointments.reduce((sum, app) => sum + (app.selectedService?.price || 0), 0);
    const uniqueServices = new Set(appointments.map(app => app.selectedService?.serviceName)).size;

    return (
      <Row id="tour-patient-stats" gutter={[16, 16]} style={{ marginBottom: "1.5rem" }}>
        <Col xs={24} sm={12} md={8}>
          <div style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', padding: '1.5rem', boxShadow: '0 4px 15px rgba(30,58,138,0.15)' }}>
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', fontWeight: '500' }}>Total Appointments</span>}
              value={appointments.length}
              valueStyle={{ color: 'white', fontWeight: '800', fontSize: '28px' }}
              prefix={<CalendarOutlined style={{ color: 'rgba(255,255,255,0.9)', marginRight: '8px' }} />}
            />
          </div>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <div style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #be185d 0%, #db2777 100%)', padding: '1.5rem', boxShadow: '0 4px 15px rgba(190,24,93,0.15)' }}>
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', fontWeight: '500' }}>Total Revenue</span>}
              value={totalSpent}
              valueStyle={{ color: 'white', fontWeight: '800', fontSize: '28px' }}
              prefix={<DollarOutlined style={{ color: 'rgba(255,255,255,0.9)', marginRight: '8px' }} />}
              precision={2}
            />
          </div>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <div style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)', padding: '1.5rem', boxShadow: '0 4px 15px rgba(15,118,110,0.15)' }}>
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', fontWeight: '500' }}>Unique Services</span>}
              value={uniqueServices}
              valueStyle={{ color: 'white', fontWeight: '800', fontSize: '28px' }}
              prefix={<FileTextOutlined style={{ color: 'rgba(255,255,255,0.9)', marginRight: '8px' }} />}
            />
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <DashboardLayout>
      <div style={{ padding: '24px' }}>
        {/* Patient Card */}
        {renderPatientCard()}

        {/* Statistics */}
        {renderStatistics()}

        {/* Appointments Table */}
        <Card
          id="tour-prescription-table"
          title={
            <Space>
              <FileTextOutlined style={{ color: '#1890ff' }} />
              <span style={{ fontSize: '18px', fontWeight: 600, color: '#0f172a' }}>Appointment History</span>
              <Tag color="blue" style={{ borderRadius: '4px', fontWeight: '600' }}>{appointments.length} appointments</Tag>
            </Space>
          }
          style={{
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            border: '1px solid #f1f5f9'
          }}
        >
          <Table
            columns={appointmentColumns}
            dataSource={appointments}
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `Total ${total} appointments`,
              pageSizeOptions: ['5', '10', '20', '50'],
            }}
            rowKey="_id"
            size="middle"
            bordered={false}
            scroll={{ x: true }}
            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
          />
        </Card>

        <style jsx="true">{`
          .table-row-light {
            background: #fafafa;
          }
          .table-row-dark {
            background: #ffffff;
          }
          .table-row-light:hover,
          .table-row-dark:hover {
            background: #e6f7ff !important;
          }
        `}</style>
      </div>
    </DashboardLayout>
  );
};

export default Prescription;