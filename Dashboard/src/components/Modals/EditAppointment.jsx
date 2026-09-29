import React, { useState } from 'react';
import Modal from './Modal';
import { Button, Checkbox, DatePickerComp, Input, Select, Textarea, TimePickerComp } from '../Form';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import BASE_URL from '../../baseUrl.jsx';

const EditAppointmentModal = ({ isOpen, closeModal, appointment, onUpdateAppointment }) => {
    const { _id, patientName, purposeOfVisit, dateOfVisit, startTime, endTime, status, doctor, share, description } = appointment;

    const [editedPatientName, setEditedPatientName] = useState(patientName);
    const [editedPurposeOfVisit, setEditedPurposeOfVisit] = useState(purposeOfVisit);
    const [editedDateOfVisit, setEditedDateOfVisit] = useState(new Date(dateOfVisit));
    const [editedStartTime, setEditedStartTime] = useState(new Date(startTime));
    const [editedEndTime, setEditedEndTime] = useState(new Date(endTime));
    const [editedStatus, setEditedStatus] = useState(status);
    const [editedDoctor, setEditedDoctor] = useState(doctor);
    const [editedDescription, setEditedDescription] = useState(description); // Define state for editedDescription
    const [editedShare, setEditedShare] = useState(share);

    const onChangeShare = (e) => {
        setEditedShare({ ...editedShare, [e.target.name]: e.target.checked });
    };

    const saveAppointment = () => {
        const apiUrl = `${BASE_URL}/api/appointments/${_id}`;

        // Format date and time values to strings
        const formattedDateOfVisit = editedDateOfVisit.toISOString();
        const formattedStartTime = editedStartTime.toISOString();
        const formattedEndTime = editedEndTime.toISOString();

        const data = {
            patientName: editedPatientName,
            purposeOfVisit: editedPurposeOfVisit,
            dateOfVisit: formattedDateOfVisit,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
            doctor: editedDoctor,
            status: editedStatus,
            description: editedDescription,
            share: editedShare,
        };
        const token = localStorage.getItem('token');

        axios.put(apiUrl, data, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                console.log('Appointment updated successfully:', response.data);
                toast.success('Appointment updated successfully');
                onUpdateAppointment(response.data);
                closeModal();
            })
            .catch(error => {
                console.error('Error updating appointment:', error);
                toast.error('Error updating appointment. Please try again later.');
            });
    };

    return (
        <Modal
            closeModal={closeModal}
            isOpen={isOpen}
            title="Edit Appointment"
            width="max-w-3xl"
        >
            <div className="space-y-6 text-left">
                <div className="grid sm:grid-cols-2 gap-5 w-full">
                    <Input
                        label="Patient Name"
                        value={editedPatientName}
                        color="true"
                        onChange={(e) => setEditedPatientName(e.target.value)}
                    />
                    <Input
                        label="Purpose of Visit"
                        value={editedPurposeOfVisit}
                        color="true"
                        onChange={(e) => setEditedPurposeOfVisit(e.target.value)}
                    />
                </div>
                
                <div className="grid sm:grid-cols-3 gap-5 w-full">
                    <DatePickerComp
                        label="Date of Visit"
                        startDate={editedDateOfVisit}
                        onChange={(date) => setEditedDateOfVisit(date)}
                    />
                    <TimePickerComp
                        label="Start Time"
                        time={editedStartTime}
                        onChange={(time) => setEditedStartTime(time)}
                    />
                    <TimePickerComp
                        label="End Time"
                        time={editedEndTime}
                        onChange={(time) => setEditedEndTime(time)}
                    />
                </div>

                <div className="grid sm:grid-cols-2 gap-5 w-full">
                    <Input
                        label="Doctor"
                        value={editedDoctor}
                        color="true"
                        onChange={(e) => setEditedDoctor(e.target.value)}
                    />
                    <Input
                        label="Status"
                        value={editedStatus}
                        color="true"
                        onChange={(e) => setEditedStatus(e.target.value)}
                    />
                </div>

                <Textarea
                    label="Description"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    placeholder="Enter description"
                    rows={4}
                />

                <div className="flex flex-col gap-3 w-full border-t border-slate-100 pt-4">
                    <p className="text-slate-700 font-medium text-sm">Share with Patient Via</p>
                    <div className="flex gap-6 mt-1">
                        <Checkbox
                            name="email"
                            checked={editedShare.email}
                            onChange={onChangeShare}
                            label="Email"
                        />
                        <Checkbox
                            name="sms"
                            checked={editedShare.sms}
                            onChange={onChangeShare}
                            label="SMS"
                        />
                        <Checkbox
                            name="whatsapp"
                            checked={editedShare.whatsapp}
                            onChange={onChangeShare}
                            label="WhatsApp"
                        />
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 w-full pt-4 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="w-full px-4 py-3 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={saveAppointment}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-subMain hover:bg-opacity-90 rounded-lg transition-all duration-200 shadow-sm"
                    >
                        Save Changes <HiOutlineCheckCircle className="text-lg" />
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default EditAppointmentModal;
