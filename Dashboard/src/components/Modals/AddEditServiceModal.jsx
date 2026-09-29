import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { Button, Input, Switchi, Textarea } from '../Form';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import axios from 'axios'; // Import Axios



// Update the AddEditServiceModal component
function AddEditServiceModal({ closeModal, isOpen, datas, onCreate }) {
  const [serviceData, setServiceData] = useState({
    name: '',
    price: 0,
    description: '',
    status: false
  });

  useEffect(() => {
    // Populate modal data when datas prop changes (i.e., when editing)
    if (datas.name) {
      setServiceData(datas);
    }
  }, [datas]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSwitchChange = () => {
    setServiceData((prevData) => ({
      ...prevData,
      status: !prevData.status
    }));
  };

  const handleSave = async () => {
    try {
      await onCreate(serviceData);
      closeModal();
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Failed to save service. Please try again.');
    }
  };

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={datas.name ? 'Edit Service' : 'New Service'}
      width="max-w-3xl"
    >
      <div className="space-y-6 text-left">
        <Input
          label="Service Name"
          name="name"
          color={true}
          value={serviceData.name}
          onChange={handleChange}
        />

        <Input
          label="Service Price (Tsh)"
          type="number"
          name="price"
          color={true}
          value={serviceData.price}
          onChange={handleChange}
        />

        <Textarea
          label="Service Description"
          name="description"
          placeholder="Write description here..."
          color={true}
          rows={4}
          value={serviceData.description}
          onChange={handleChange}
        />

        <div className="flex items-center gap-3 w-full border-t border-slate-100 pt-4">
          <Switchi
            label="Status"
            checked={serviceData.status}
            onChange={handleSwitchChange}
          />
          <p className={`text-sm font-medium ${serviceData.status ? 'text-subMain' : 'text-slate-500'}`}>
            {serviceData.status ? 'Showing to Patients' : 'Hidden from Patients'}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={closeModal}
            className="w-full px-4 py-3 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200"
          >
            {datas.name ? 'Discard' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-subMain hover:bg-opacity-90 rounded-lg transition-all duration-200 shadow-sm"
          >
            Save <HiOutlineCheckCircle className="text-lg" />
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddEditServiceModal;
