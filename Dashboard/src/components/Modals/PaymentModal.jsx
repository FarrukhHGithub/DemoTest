import React, { useState } from 'react';
import Modal from './Modal';
import { Button, Select } from '../Form';
import { sortsDatas } from '../Datas';
import { BiChevronDown } from 'react-icons/bi';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { toast } from 'react-hot-toast';

function PaymentModal({ closeModal, isOpen, slug }) {
  const [currency, setCurrency] = useState(sortsDatas.status[0]);
  const [payment, setPayment] = useState(sortsDatas.method[0]);
  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title="Generate Payment"
      width="max-w-xl"
    >
      <div className="space-y-6 text-left">
        <div className="w-full flex flex-col gap-2">
          <p className="text-slate-700 font-medium text-sm">Status</p>
          <Select
            selectedPerson={currency}
            setSelectedPerson={setCurrency}
            datas={sortsDatas?.status}
          >
            <div className="w-full flex justify-between items-center text-slate-700 text-sm p-3.5 border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
              <span>{currency?.name}</span>
              <BiChevronDown className="text-xl text-slate-400" />
            </div>
          </Select>
        </div>
        
        {/* card */}
        <div className="w-full flex flex-col gap-2">
          <p className="text-slate-700 font-medium text-sm">Payment Method</p>
          <Select
            selectedPerson={payment}
            setSelectedPerson={setPayment}
            datas={sortsDatas?.method}
          >
            <div className="w-full flex justify-between items-center text-slate-700 text-sm p-3.5 border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
              <span>{payment?.name}</span>
              <BiChevronDown className="text-xl text-slate-400" />
            </div>
          </Select>
        </div>

        {/* button bar */}
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
            onClick={() => {
              toast.error('This feature is not available yet');
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-subMain hover:bg-opacity-90 rounded-lg transition-all duration-200 shadow-sm"
          >
            Generate <CgSpinnerTwoAlt className="text-lg" />
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default PaymentModal;
