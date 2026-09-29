// AddItemModal.jsx
import React, { useState } from 'react';
import Modal from './Modal';
import { BiPlus } from 'react-icons/bi';
import { Input, Button } from '../Form';
import PatientMedicineServiceModal from './PatientMedicineServiceModal';

function AddItemModal({ closeModal, isOpen, handleAddItem }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [isPatientMedicineModalOpen, setIsPatientMedicineModalOpen] = useState(false);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddItemClick = () => {
    if (selectedService && quantity > 0) {
      handleAddItem(selectedService, quantity);
      closeModal();
    } else {
      console.log('Invalid selection');
      // Handle error case where service is not selected or quantity is invalid
    }
  };


  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title="Add Item"
      width="max-w-xl"
    >
      <div className="space-y-4 text-left">
        <div className="flex flex-col gap-2 w-full">
          <p className="text-slate-700 font-semibold text-xs">Service / Medicine</p>
          {/* Display selected service */}
          {selectedService ? (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">{selectedService.name}</span>
              <button
                type="button"
                onClick={() => setIsPatientMedicineModalOpen(true)}
                className="text-xs text-subMain hover:underline font-semibold"
              >
                Change
              </button>
            </div>
          ) : (
            /* Button to open service selection modal */
            <button
              type="button"
              onClick={() => setIsPatientMedicineModalOpen(true)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-dashed border-slate-300 hover:border-subMain hover:bg-subMain/5 text-slate-600 hover:text-subMain text-xs font-semibold transition-all duration-200 bg-slate-50/40 cursor-pointer"
            >
              <BiPlus className="text-base" /> Choose Item
            </button>
          )}
        </div>
        
        <Input
          label="Quantity"
          color={true}
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
        />
        
        <div className="grid grid-cols-2 gap-3 w-full pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={closeModal}
            className="w-full py-2.5 px-4 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAddItemClick}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-bold text-white bg-subMain hover:bg-opacity-90 rounded-lg transition-all duration-200 shadow-xs cursor-pointer"
          >
            Add Item <BiPlus className="text-base" />
          </button>
        </div>
      </div>
      {/* Render service selection modal */}
      {isPatientMedicineModalOpen && (
        <PatientMedicineServiceModal
          closeModal={() => setIsPatientMedicineModalOpen(false)}
          isOpen={isPatientMedicineModalOpen}
          // Pass selected service to update state
          onSelectService={(selectedService) => {
            setSelectedService(selectedService);
          }}
        />
      )}
    </Modal>
  );
}

export default AddItemModal;
