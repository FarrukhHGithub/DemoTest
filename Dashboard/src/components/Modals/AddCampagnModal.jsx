import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { MdOutlineTextsms } from 'react-icons/md';
import EmailComp from '../Campaign/EmailComp';

function CampaignModal({ closeModal, isOpen, data, updateCampaignsState }) {
  const [indexs, setIndexs] = useState(0);

  // Change tab
  const changeTab = (value) => {
    setIndexs(value);
  };

  // Tabs data
  const tabs = [
    // { title: 'Email', icon: MdOutlineTextsms },
    // Add other tabs here if needed
  ];

  // Edit
  useEffect(() => {
    if (data?.id && data?.type === 'email') {
      setIndexs(0);
    }
  }, [data]);

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={data?.id ? 'View Campaign' : 'Create Campaign'}
      width="max-w-3xl"
    >
      <div className="space-y-6 text-left">
        {/* Radio */}
        {tabs.length > 0 && !data?.id && (
          <div className="grid grid-cols-3 gap-4 w-full bg-slate-50 border border-slate-100 rounded-lg p-1.5">
            {tabs.map((item, index) => (
              <button
                onClick={() => changeTab(index)}
                key={index}
                className={`flex gap-3 items-center justify-center py-2 px-4 rounded-lg transition-all text-sm font-medium ${
                  indexs === index ? 'bg-subMain text-white shadow-sm' : 'text-slate-600 hover:text-slate-100'
                }`}
              >
                {item.icon && <item.icon />}
                <span className="text-xs font-semibold">{item.title}</span>
              </button>
            ))}
          </div>
        )}

        {/* Component */}
        <div className="w-full">
          {indexs === 0 && <EmailComp data={data} closeModal={closeModal} updateCampaignsState={updateCampaignsState} />}
        </div>
      </div>
    </Modal>
  );
}

export default CampaignModal;