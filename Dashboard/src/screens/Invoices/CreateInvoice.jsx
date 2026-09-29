import React from 'react';
import Layout from '../../Layout';
import { FromToDate } from '../../components/Form';
import { BiPlus } from 'react-icons/bi';
import AddItemModal from '../../components/Modals/AddItemInvoiceModal';
import { invoicesData } from '../../components/Datas';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { InvoiceProductsTable } from '../../components/Tables';
import SenderReceverComp from '../../components/SenderReceverComp';
import pic from '../../build/images/upLogo.jpg';
import { useCreateInvoice } from './useCreateInvoice';
import { InvoiceTotalsSection } from './InvoiceTotalsSection';

function CreateInvoice() {
  const {
    startDate,
    endDate,
    currency,
    isOpen,
    setIsOpen,
    itemOpen,
    setItemOpen,
    selectedCurrency,
    selectedPatient,
    invoiceItems,
    subtotal,
    discount,
    tax,
    grandTotal,
    notes,
    onChangeDates,
    handleAddItemClick,
    handleSelectPatient,
    handleAddItem,
    handleSaveInvoice,
    handleCurrencyChange,
    handleSendEmail,
    handleSendWhatsApp,
    deleteItem,
    handleSubtotalChange,
    handleDiscountChange,
    handleTaxChange,
    handleNotesChange,
  } = useCreateInvoice();

  return (
    <Layout>
      {itemOpen && (
        <AddItemModal
          closeModal={() => setItemOpen(false)}
          isOpen={itemOpen}
          handleAddItem={handleAddItem}
        />
      )}
      <div className="flex items-center gap-3">
        <Link
          to="/invoices"
          className="bg-white border border-subMain border-dashed rounded-lg py-2 px-3 text-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <IoArrowBackOutline />
        </Link>
        <h1 className="text-lg sm:text-xl font-bold text-main">Create Invoice</h1>
      </div>
      <div className="bg-white my-5 rounded-xl border border-border p-4 sm:p-5 shadow-xs">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 items-center">
          <div className="lg:col-span-3">
            <img
              src={pic}
              alt="logo"
              className="w-32 object-contain"
            />
          </div>
          <div className="flex flex-col gap-3">
            <FromToDate
              startDate={startDate}
              endDate={endDate}
              label="Dates"
              onChange={onChangeDates}
            />
          </div>
        </div>
        <SenderReceverComp
          item={invoicesData?.[1].to}
          functions={{
            openModal: () => {
              setIsOpen(!isOpen);
            },
          }}
          button={true}
          selectedPatient={selectedPatient}
          handleSelectPatient={handleSelectPatient}
        />
        <div className="grid grid-cols-6 gap-5 mt-6">
          <div className="col-span-6 lg:col-span-4 p-4 border border-border rounded-xl overflow-hidden">
            <InvoiceProductsTable
              data={invoiceItems}
              functions={{ deleteItem }}
              button={true}
              selectedCurrency={selectedCurrency}
              discount={discount}
              tax={tax}
            />

            <button
              onClick={handleAddItemClick}
              className="text-subMain flex items-center justify-center gap-2 rounded-lg border border-subMain border-dashed py-2.5 w-full text-xs font-bold mt-3 hover:bg-subMain/5 transition-colors cursor-pointer"
            >
              <BiPlus /> Add Item
            </button>
          </div>
          
          <InvoiceTotalsSection
            currency={currency}
            handleCurrencyChange={handleCurrencyChange}
            discount={discount}
            handleDiscountChange={handleDiscountChange}
            tax={tax}
            handleTaxChange={handleTaxChange}
            subtotal={subtotal}
            handleSubtotalChange={handleSubtotalChange}
            grandTotal={grandTotal}
            notes={notes}
            handleNotesChange={handleNotesChange}
            handleSaveInvoice={handleSaveInvoice}
            handleSendEmail={handleSendEmail}
            handleSendWhatsApp={handleSendWhatsApp}
          />
        </div>
      </div>
    </Layout >
  );
}

export default CreateInvoice;
