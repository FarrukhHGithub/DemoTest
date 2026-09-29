import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthProvider } from './AuthContext';
import { TourProvider } from './components/DriverTourProvider';
import DriverTour from './components/DriverTour';
import PrivateRoute from './Private.jsx';
import { ToastContainer } from 'react-toastify';

// Global axios response interceptor to handle deleted users / token revocation
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, config } = error.response;
      const isUserauthUrl = config.url && config.url.includes('/api/userauth/');
      const isLoginUrl = config.url && config.url.includes('/api/userauth/login');

      if ((status === 401 && !isLoginUrl) || (status === 404 && isUserauthUrl)) {
        localStorage.removeItem('token');
        localStorage.removeItem('clientId');
        localStorage.removeItem('loginTime');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
const Home = React.lazy(() => import('./components/Home/Home/Home'));
const SignInForm = React.lazy(() => import('./components/Login/SignInForm'));
const Contact = React.lazy(() => import('./components/Contact/Contact'));
const AppointmentPage = React.lazy(() => import('./components/Appointment/AppointmentPage'));
const Dashboard = React.lazy(() => import('./components/Doctor/Dashboard/Dashboard'));
const Prescription = React.lazy(() => import('./components/Doctor/Prescription/Prescription'));
const ChangePassword = React.lazy(() => import('./components/Doctor/ChangePassword/ChangePassword'));
const ProfileSetting = React.lazy(() => import('./components/Doctor/ProfileSetting/ProfileSetting'));
const Attachment = React.lazy(() => import('./components/Attachment'));
const Success = React.lazy(() => import('./StripeSuccess/Success'));
const Cancel = React.lazy(() => import('./StripeSuccess/Cancel'));
const NotFound = React.lazy(() => import('./Notfound'));

const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: '#f8fafc' }}>
    <div className="loading-spinner" style={{ width: '40px', height: '40px', border: '4px solid #cbd5e1', borderTop: '4px solid #1890ff', borderRadius: '50%', animation: 'spinAppLoader 1s linear infinite' }} />
    <style>{`
      @keyframes spinAppLoader {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<SignInForm />} />
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="/appointment" element={<AppointmentPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard/:clientId"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/prescription/:id"
        element={
          <PrivateRoute>
            <Prescription />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/profile-setting/:clientId"
        element={
          <PrivateRoute>
            <ProfileSetting />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/attachments/:clientId"
        element={
          <PrivateRoute>
            <Attachment />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/change-password/:clientId"
        element={
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <TourProvider>
          <ToastContainer />
          <Suspense fallback={<LoadingSpinner />}>
            <AppRoutes />
          </Suspense>
          <DriverTour />
        </TourProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}