import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { Button } from '../Form';
import { toast } from 'react-hot-toast';
import { HiOutlineMail } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import BASE_URL from '../../baseUrl.jsx';

export const shareData = [
  {
    id: 1,
    icon: HiOutlineMail,
    title: "Email",
    description: "Send to patient email address",
  },
  {
    id: 2,
    icon: FaWhatsapp,
    title: "WhatsApp",
    description: "Send to patient WhatsApp account",
  },
];

function ShareModal({ closeModal, isOpen, dataToShare }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    if (!selectedOption) {
      toast.error('Please select a sharing option');
      return;
    }

    setLoading(true);

    try {
      // Make API request to share data
      const response = await axios.post(`${BASE_URL}/api/files/share/whatsapp`, {
        method: selectedOption === 1 ? 'email' : 'whatsapp', // Determine sharing method
        data: dataToShare, // Data to be shared (file path or other relevant data)
      });

      toast.success(response.data.message); // Display success message from server
      closeModal();
      setLoading(false);
    } catch (error) {
      console.error('Share failed:', error);
      toast.error('Failed to share');
      setLoading(false);
    }
  };

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title="Share Data"
      width="max-w-xl"
    >
      <div className="space-y-6 text-left">
        {/* Render sharing options */}
        <div className="space-y-3 w-full">
          {shareData.map(option => {
            const Icon = option.icon;
            const isSelected = selectedOption === option.id;
            return (
              <div
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "border-subMain bg-subMain/5 shadow-sm"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                }`}
              >
                <div className={`p-2.5 rounded-lg ${isSelected ? "bg-subMain text-white" : "bg-slate-100 text-slate-500"}`}>
                  <Icon className="text-xl" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-slate-800">{option.title}</p>
                  <p className="text-xs text-slate-500">{option.description}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? "border-subMain bg-subMain" : "border-slate-300"}`}>
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Share buttons */}
        <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={closeModal}
            className="w-full px-4 py-3 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleShare}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-subMain hover:bg-opacity-90 rounded-lg transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sharing...' : 'Share'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ShareModal;
