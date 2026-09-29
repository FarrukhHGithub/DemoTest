import React from 'react';
import Layout from '../../Layout';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import pic from '../../build/images/upLogo.jpg';
import { MdOutlineCloudDownload } from 'react-icons/md';
import { AiOutlinePrinter } from 'react-icons/ai';
import PaymentModal from '../../components/Modals/PaymentModal';
import ShareModal from '../../components/Modals/ShareModal';
import { InvoiceProductsTable } from '../../components/Tables';
import { usePreviewInvoice } from './usePreviewInvoice';

function PreviewInvoice() {
  const {
    invoice,
    isOpen,
    setIsoOpen,
    isShareOpen,
    setIsShareOpen,
    loader,
    downloadPDF,
    printPDF,
  } = usePreviewInvoice();

  const buttonClass = 'bg-subMain flex-rows gap-3 bg-opacity-5 text-subMain rounded-lg border border-subMain border-dashed px-4 py-3 text-sm';

  return (
    <Layout>
      {isOpen && (
        <PaymentModal
          isOpen={isOpen}
          closeModal={() => {
            setIsoOpen(false);
          }}
        />
      )}
      {isShareOpen && (
        <ShareModal
          isOpen={isShareOpen}
          closeModal={() => {
            setIsShareOpen(false);
          }}
        />
      )}
      <div className="flex-btn flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/invoices"
            className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
          >
            <IoArrowBackOutline />
          </Link>
          <h1 className="text-xl font-semibold">Preview Invoice</h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            className={buttonClass}
            onClick={downloadPDF}
            disabled={loader}
          >
            {loader ? (
              <span>Downloading</span>
            ) : (
              <span className="flex items-center justify-between gap-4"> Download <MdOutlineCloudDownload /></span>
            )}
          </button>
          <button
            onClick={printPDF}
            className={buttonClass}
          >
            Print <AiOutlinePrinter />
          </button>
        </div>
      </div>
      <div className='actual-receipt'>
        {invoice?.patient && (
          <div className="mt-6 border border-border rounded-lg p-4">
            <h5 className="text-sm font-semibold mb-2">Patient Info</h5>
            <div className="flex flex-col gap-1 text-sm">
              <p>
                <span className="font-medium">Name: </span>
                {invoice.patient.fullName}
              </p>
              <p>
                <span className="font-medium">Email: </span>
                {invoice.patient.email}
              </p>
            </div>
          </div>
        )}
        {invoice && (
          <div className="bg-white my-8 rounded-xl border-[1px] border-border p-5">
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 items-center">
              <div className="lg:col-span-3">
                <img
                  src={pic}
                  alt="logo"
                  className="w-32 object-contain"
                />
              </div>
              <div className="flex flex-col gap-4 sm:items-end">
                <div className="flex gap-4">
                  <p className="text-sm font-extralight">Date:</p>
                  <h6 className="text-xs font-medium">{new Date(invoice?.createdDate).toLocaleDateString()}</h6>
                </div>
                <div className="flex gap-4">
                  <p className="text-sm font-extralight">Due Date:</p>
                  <h6 className="text-xs font-medium">{new Date(invoice?.dueDate).toLocaleDateString()}</h6>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-6 mt-8">
              <div className="lg:col-span-4 col-span-6 p-6 border border-border rounded-xl overflow-hidden">
                <InvoiceProductsTable
                  data={invoice?.invoiceItems}
                  discount={invoice?.discount || 0}
                  tax={invoice?.tax || 0}
                  total={invoice?.total}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default PreviewInvoice;
