import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { BiSearch, BiPlus } from 'react-icons/bi';
import { Button } from '../Form';
import axios from 'axios';
import BASE_URL from '../../baseUrl.jsx';

function PatientMedicineServiceModal({ closeModal, isOpen, onSelectService }) {
  const [searchValue, setSearchValue] = useState(''); // State to store search field value
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/api/services`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const filteredServices = services.filter((service) =>
    service.name?.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleServiceSelect = (service) => {
    onSelectService(service); // Pass selected service to parent component
    closeModal(); // Close the modal
  };

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title="Services"
      width="max-w-xl"
    >
      <div className="space-y-5 text-left">
        {/* Search */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search service..."
            className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-lg focus:border-subMain bg-slate-50/50 hover:bg-slate-50/80 transition-colors"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <BiSearch className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
        </div>

        {/* Dropdown menu for services */}
        <div className="w-full max-h-60 overflow-y-auto border border-slate-100 rounded-xl shadow-inner bg-slate-50/20">
          <ul className="divide-y divide-slate-100">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <li
                  key={service._id}
                  className="px-5 py-3.5 hover:bg-slate-50 cursor-pointer transition-colors text-sm text-slate-700 font-medium flex items-center justify-between group"
                  onClick={() => handleServiceSelect(service)}
                >
                  <span>{service.name}</span>
                  <span className="text-xs text-slate-400 group-hover:text-subMain transition-colors">Select &rarr;</span>
                </li>
              ))
            ) : (
              <li className="px-5 py-6 text-center text-sm text-slate-400">No services found</li>
            )}
          </ul>
        </div>

        {/* Button */}
        <button
          type="button"
          onClick={closeModal}
          className="w-full px-4 py-3 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200 border border-slate-200"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default PatientMedicineServiceModal;
