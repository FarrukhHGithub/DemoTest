import React from 'react';
import Modals from './Modals';

const AppointmentDetailsModal = ({ isOpen, closeModal, event, onDelete }) => {
    if (!isOpen || !event) return null;

    const handleDelete = () => {
        onDelete(event.id);
    };

    return (
        <Modals isOpen={isOpen} onClose={closeModal} title="Appointment Details" width="max-w-2xl">
            <div id="tour-appointment-details-modal" className="space-y-6 text-left">
                <div className="grid sm:grid-cols-2 gap-6 bg-slate-50/50 border border-slate-100 rounded-xl p-5 text-sm">
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Schedule Info</h4>
                        <div className="space-y-2.5 text-slate-700">
                            <p><strong>Title:</strong> <span className="font-semibold text-slate-900">{event.title}</span></p>
                            <p><strong>Start:</strong> <span className="font-medium">{event.start?.toLocaleString()}</span></p>
                            <p><strong>End:</strong> <span className="font-medium">{event.end?.toLocaleString()}</span></p>
                            <p><strong>Service:</strong> <span className="font-medium text-subMain">{event.selectedService?.serviceName || event.selectedService?.name || event.serviceName || 'N/A'}</span></p>
                            <p><strong>Price:</strong> <span className="font-semibold text-slate-900">
                                {(() => {
                                    const price = event.selectedService?.price ?? event.selectedService?.servicePrice ?? event.servicePrice;
                                    return price !== undefined && price !== null ? `${price} Tsh` : 'N/A';
                                })()}
                            </span></p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Patient Info</h4>
                        <div className="space-y-2.5 text-slate-700">
                            <p><strong>Name:</strong> <span className="font-semibold text-slate-900">{event.patientInfo?.name || event.patientInfo?.fullName || event.fullName || 'N/A'}</span></p>
                            <p><strong>Email:</strong> <span className="font-medium">{event.patientInfo?.email || event.email || 'N/A'}</span></p>
                            <p><strong>Emergency:</strong> <span className="font-medium">{event.patientInfo?.emergencyContact || event.patientInfo?.phone || event.emergencyContact || 'N/A'}</span></p>
                            <p><strong>Blood Group:</strong> <span className="font-medium">{event.patientInfo?.bloodGroup || event.bloodGroup || 'N/A'}</span></p>
                            <p><strong>Gender:</strong> <span className="font-medium capitalize">{event.patientInfo?.gender || event.gender || 'N/A'}</span></p>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-end pt-2">
                    <button
                        onClick={closeModal}
                        className="px-6 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200 border border-slate-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modals>
    );
};

export default AppointmentDetailsModal;
