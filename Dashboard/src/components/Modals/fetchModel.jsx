import React from 'react';
import moment from 'moment';
import Modal from './Modal';

const AppointmentDetailsModal = ({ isOpen, closeModal, event, onDelete }) => {
    if (!isOpen || !event) return null;

    const renderDetails = () => {
        return Object.keys(event).map((key) => {
            if (key === 'id' || key === 'title') return null; // title will be in the header or styled separately
            return (
                <div key={key} className="grid grid-cols-12 gap-2 py-3.5 border-b border-slate-100 last:border-b-0 items-start text-sm">
                    <span className="col-span-4 font-semibold text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="col-span-8 text-slate-800 font-medium break-words">{renderValue(event[key])}</span>
                </div>
            );
        });
    };

    const renderValue = (value) => {
        if (moment.isDate(value)) {
            return moment(value).format('LLLL'); // Format Date objects using moment
        }
        if (typeof value === 'object' && value !== null) {
            return Object.entries(value).map(([key, val]) => (
                <div key={key} className="flex gap-2 text-xs py-1">
                    <span className="font-semibold text-slate-400 capitalize">{key}:</span>
                    <span className="text-slate-600">{renderValue(val)}</span>
                </div>
            ));
        }
        return String(value);
    };

    const handleDeleteClick = () => {
        onDelete(event.id); // Pass the id of the event to be deleted
        closeModal(); // Close the modal after deletion
    };

    return (
        <Modal
            closeModal={closeModal}
            isOpen={isOpen}
            title={event.title || "Appointment Details"}
            width="max-w-xl"
        >
            <div className="space-y-6 text-left">
                <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-4">
                    {renderDetails()} {/* Render all details */}
                </div>
                
                <div className="grid grid-cols-2 gap-4 w-full pt-2 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={handleDeleteClick} // Handle delete button click
                        className="w-full px-4 py-3 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200 border border-red-100"
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="w-full px-4 py-3 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200 border border-slate-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default AppointmentDetailsModal;
