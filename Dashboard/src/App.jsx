import 'tailwindcss/tailwind.css';
import './App.css';
import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Aos from 'aos';
import Toast from './components/Notifications/Toast';
import Loader from './components/Notifications/Loader';

// Lazy loading screen components to optimize bundle size
const Dashboard = lazy(() => import('./screens/Dashboard'));
const Payments = lazy(() => import('./screens/Payments/Payments'));
const Appointments = lazy(() => import('./screens/Appointments'));
const Patients = lazy(() => import('./screens/Patients/Patients'));
const Campaings = lazy(() => import('./screens/Campaings'));
const Services = lazy(() => import('./screens/Services'));
const Invoices = lazy(() => import('./screens/Invoices/Invoices'));
const Settings = lazy(() => import('./screens/Settings'));
const CreateInvoice = lazy(() => import('./screens/Invoices/CreateInvoice'));
const EditInvoice = lazy(() => import('./screens/Invoices/EditInvoice'));
const PreviewInvoice = lazy(() => import('./screens/Invoices/PreviewInvoice'));
const EditPayment = lazy(() => import('./screens/Payments/EditPayment'));
const PreviewPayment = lazy(() => import('./screens/Payments/PreviewPayment'));
const Medicine = lazy(() => import('./screens/Medicine'));
const PatientProfile = lazy(() => import('./screens/Patients/PatientProfile'));
const CreatePatient = lazy(() => import('./screens/Patients/CreatePatient'));
const DoctorProfile = lazy(() => import('./screens/Doctors/DoctorProfile'));
const Receptions = lazy(() => import('./screens/Receptions'));
const NewMedicalRecode = lazy(() => import('./screens/Patients/NewMedicalRecode'));
const NotFound = lazy(() => import('./screens/NotFound'));
const Login = lazy(() => import('./screens/Login'));
const Register = lazy(() => import('./screens/Register'));
const Users = lazy(() => import('./screens/Users/Users'));
const ArchivedPatients = lazy(() => import('./screens/History/ArchivedPatients'));

import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';
import { NotificationProvider } from './components/NotificationContext';
import { TourProvider } from './components/DriverTourProvider';
import { ToastContainer } from 'react-toastify'; 

function PrivateRoute({ element, ...props }) {
  const { user } = useAuth();

  return user ? element : <Navigate to="/login" replace />;
}

function App() {
  const { user } = useAuth();

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <Toast />
      <ToastContainer /> 
      <BrowserRouter>
        <TourProvider>
          <NotificationProvider>
            <Suspense fallback={<Loader />}>
              <Routes>
                {user && <Route path="/login" element={<Navigate to="/" replace />} />}
                {!user && <Route path="/login" element={<Login />} />}
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
                <Route path="/invoices" element={<PrivateRoute element={<Invoices />} />} />
                <Route path="/invoices/create" element={<PrivateRoute element={<CreateInvoice />} />} />
                <Route path="/invoices/edit/:id" element={<PrivateRoute element={<EditInvoice />} />} />
                <Route path="/invoices/preview/:id" element={<PrivateRoute element={<PreviewInvoice />} />} />
                <Route path="/payments" element={<PrivateRoute element={<Payments />} />} />
                <Route path="/payments/edit/:id" element={<PrivateRoute element={<EditPayment />} />} />
                <Route path="/payments/preview/:id" element={<PrivateRoute element={<PreviewPayment />} />} />
                <Route path="/users" element={<PrivateRoute element={<Users />} />} />
                <Route path="/patients" element={<PrivateRoute element={<Patients />} />} />
                <Route path="/patients/preview/:id" element={<PrivateRoute element={<PatientProfile />} />} />
                <Route path="/patients/profile/:id" element={<PrivateRoute element={<PatientProfile />} />} />
                <Route path="/patients/create" element={<PrivateRoute element={<CreatePatient />} />} />
                <Route path="/patients/visiting/:id" element={<PrivateRoute element={<NewMedicalRecode />} />} />
                <Route path="/doctors/preview/:id" element={<PrivateRoute element={<DoctorProfile />} />} />
                <Route path="/receptions" element={<PrivateRoute element={<Receptions />} />} />
                <Route path="/appointments" element={<PrivateRoute element={<Appointments />} />} />
                <Route path="/campaigns" element={<PrivateRoute element={<Campaings />} />} />
                <Route path="/medicine" element={<PrivateRoute element={<Medicine />} />} />
                <Route path="/services" element={<PrivateRoute element={<Services />} />} />
                <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
                <Route path="/archived" element={<PrivateRoute element={<ArchivedPatients />} />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </NotificationProvider>
        </TourProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
