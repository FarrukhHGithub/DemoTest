import React, { useState } from 'react';
import Modal from './Modal';
import { Button, Input } from '../../components/Form';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import BASE_URL from '../../baseUrl.jsx';

function AddDoctorModal({ closeModal, isOpen, doctor, datas }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (event) => {
    setProfileImage(event.target.files[0]);
  };

  const saveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('profileImage', profileImage);

      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BASE_URL}/api/doctors`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast.success('Doctor information saved successfully');
      closeModal();
    } catch (error) {
      console.error('Error saving doctor information:', error);
      toast.error('Failed to save doctor information');
    }
  };

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={doctor ? 'Add Doctor' : datas?.id ? 'Edit Staff' : 'Add Stuff'}
      width="max-w-xl"
    >
      <div className="space-y-5">
        <div className="space-y-4">
          <Input
            label="Full Name"
            color="true"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            color="true"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Phone Number"
            type="text"
            color="true"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            label="Address"
            type="text"
            color="true"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">Profile Image</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100 border border-slate-200 rounded-lg p-2.5 bg-slate-50/50"
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
            onClick={saveChanges}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-subMain hover:bg-opacity-90 rounded-lg transition-all duration-200 shadow-sm"
          >
            Save Changes <HiOutlineCheckCircle className="text-lg" />
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddDoctorModal;
