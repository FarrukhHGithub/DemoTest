import React, { useEffect } from 'react';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import AppointmentPage from '../../Appointment/AppointmentPage';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { role } = useAuthCheck();
  const navigate = useNavigate();

  const clientId = localStorage.getItem('clientId');

  useEffect(() => {
    console.log("Dashboard clientId:", clientId);

    // ✅ safety guard
    if (!clientId || clientId === "undefined") {
      console.log("Invalid clientId → redirecting");
      navigate('/dashboard/profile-setting');
    }
  }, [clientId, navigate]);

  return (
    <DashboardLayout>
      <div style={{ padding: '0.25rem 0.5rem', width: '100%', margin: '0 auto' }}>
        {/* Welcome Header */}
        {/* <div id="tour-dashboard-header" style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#0f172a', fontWeight: '700', margin: 0 }}>Dashboard Panel</h3>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '4px 0 0 0' }}>
            Manage your upcoming schedule, bookings, and patient consultations.
          </p>
        </div> */}

        {/* Appointments Section */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
            border: '1px solid #f1f5f9'
          }}
        >
          {/* <div
            id="tour-dashboard-upcoming"
            style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <div style={{ width: '4px', height: '18px', backgroundColor: '#1890ff', borderRadius: '2px' }} />
            <h5 style={{ color: '#1e293b', fontWeight: '600', margin: 0, fontSize: '16px' }}>
              Upcoming Consultations
            </h5>
          </div> */}

          <AppointmentPage clientId={clientId} hideHeader={true} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;