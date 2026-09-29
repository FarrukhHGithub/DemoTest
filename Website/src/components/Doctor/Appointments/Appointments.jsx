import React, { useState, useCallback } from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import img from '../../../images/doc/doctor 3.jpg';
import { message } from 'antd';
import AppointmentCard from './AppointmentCard';

// Dummy data for demonstration
const dummyData = [
    {
        id: 1,
        patient: { firstName: "John", lastName: "Doe", address: "123 Street, City", email: "john@example.com", mobile: "123-456-7890" },
        trackingId: "ABC123",
        appointmentTime: "2024-02-09T12:00:00Z",
        status: "pending",
        patientType: "new",
        isFollowUp: false,
        paymentStatus: "paid",
        prescriptionStatus: "issued",
        prescription: [{ id: 1 }]
    },
];

const Appointments = () => {
    const [appointments, setAppointments] = useState(dummyData);

    const updatedAppointmentStatus = useCallback((id, type) => {
        setAppointments(prev => prev.map(appointment => {
            if (appointment.id === id) {
                return { ...appointment, status: type };
            }
            return appointment;
        }));
    }, []);

    const clickToCopyClipboard = useCallback((id) => {
        const textField = document.createElement('textarea');
        textField.innerText = id;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        document.body.removeChild(textField);
        message.success("Copied To Clipboard");
    }, []);

    return (
        <DashboardLayout>
            {appointments.map(item => (
                <AppointmentCard
                    key={item.id}
                    item={item}
                    img={img}
                    clickToCopyClipboard={clickToCopyClipboard}
                    updatedAppointmentStatus={updatedAppointmentStatus}
                />
            ))}
        </DashboardLayout>
    );
};

export default Appointments;
