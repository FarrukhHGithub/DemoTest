import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MdOutlineCloudDownload } from 'react-icons/md';
import { AiOutlinePrinter } from 'react-icons/ai';

function InvoiceActions({ loader, setLoader }) {

  const buttonClass =
    'bg-subMain flex-rows gap-3 bg-opacity-5 text-subMain rounded-lg border border-subMain border-dashed px-4 py-3 text-sm';

  const downloadPDF = () => {
    const capture = document.querySelector('.actual-receipt');
    if (!capture) return;

    setLoader(true);

    html2canvas(capture, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'mm', 'legal');

      const aspectRatio = canvas.width / canvas.height;
      const width = doc.internal.pageSize.getWidth() - 20;
      const height = width / aspectRatio;

      doc.addImage(imgData, 'PNG', 10, 10, width, height);
      setLoader(false);
      doc.save('receipt.pdf');
    });
  };

  const printPDF = () => {
    const prtContent = document.querySelector('.actual-receipt').innerHTML;
    const original = document.body.innerHTML;

    document.body.innerHTML = prtContent;
    window.print();
    document.body.innerHTML = original;
  };

  return (
    <>
      <button
        className={buttonClass}
        onClick={downloadPDF}
        disabled={loader}
      >
        {loader ? (
          <span>Downloading</span>
        ) : (
          <span className="flex items-center justify-between gap-4">
            Download <MdOutlineCloudDownload />
          </span>
        )}
      </button>

      <button onClick={printPDF} className={buttonClass}>
        Print <AiOutlinePrinter />
      </button>
    </>
  );
}

export default InvoiceActions;