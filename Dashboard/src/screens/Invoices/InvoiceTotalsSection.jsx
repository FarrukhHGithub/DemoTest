import React from "react";
import { Input, Select, Textarea, Button } from "../../components/Form";
import { BiChevronDown } from 'react-icons/bi';
import { sortsDatas } from '../../components/Datas';
import { BsSend } from 'react-icons/bs';

export const InvoiceTotalsSection = ({
  currency,
  handleCurrencyChange,
  discount,
  handleDiscountChange,
  tax,
  handleTaxChange,
  subtotal,
  handleSubtotalChange,
  grandTotal,
  notes,
  handleNotesChange,
  handleSaveInvoice,
  handleSendEmail,
  handleSendWhatsApp,
}) => {
  return (
    <div className="lg:col-span-2 col-span-6 flex flex-col gap-6">
      <Select
        selectedPerson={currency}
        setSelectedPerson={handleCurrencyChange}
        datas={sortsDatas?.currency}
      >
        <div className="h-14 w-full text-xs text-main rounded-md border border-border px-4 flex items-center justify-between">
          <p>{currency?.name}</p>
          <BiChevronDown className="text-xl" />
        </div>
      </Select>

      <div className="grid sm:grid-cols-2 gap-6">
        <Input
          label="Discount"
          color={true}
          type="number"
          value={discount.toString()}
          onChange={handleDiscountChange}
          placeholder={'3000'}
        />
        <Input
          label="Tax(%)"
          color={true}
          type="number"
          value={tax.toString()}
          onChange={handleTaxChange}
          placeholder={'3'}
        />
      </div>
      <div className="flex-btn gap-4">
        <p className="text-sm font-extralight">Sub Total:</p>
        <Input
          type="number"
          color={true}
          value={subtotal.toString()}
          onChange={handleSubtotalChange}
        />
      </div>
      <div className="flex-btn gap-4">
        <p className="text-sm font-extralight">Discount:</p>
        <Input
          type="number"
          color={true}
          value={discount.toString()}
          onChange={handleDiscountChange}
        />
      </div>
      <div className="flex-btn gap-4">
        <p className="text-sm font-extralight">Tax:</p>
        <Input
          type="number"
          color={true}
          value={tax.toString()}
          onChange={handleTaxChange}
        />
      </div>
      <div className="flex-btn gap-4">
        <p className="text-sm font-extralight">Grand Total:</p>
        <h6 className="text-sm font-medium text-green-600">{grandTotal.toString()}</h6>
      </div>
      <Textarea
        label="Notes"
        value={notes}
        onChange={handleNotesChange}
        rows={3}
      />
      <div className="flex flex-col gap-3">
        <Button
          label="Save Invoice"
          onClick={handleSaveInvoice}
          Icon={BsSend}
        />
        <button
          onClick={handleSendEmail}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium text-sm transition-all hover:bg-blue-600 active:scale-95"
        >
          Send Invoice Email
        </button>
        <button
          onClick={handleSendWhatsApp}
          className="bg-green-500 text-white py-2 px-4 rounded-lg font-medium text-sm transition-all hover:bg-green-600 active:scale-95"
        >
          Send Invoice WhatsApp
        </button>
      </div>
    </div>
  );
};
