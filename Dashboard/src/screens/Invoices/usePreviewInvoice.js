import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import BASE_URL from '../../baseUrl.jsx';

export function usePreviewInvoice() {
  const { id } = useParams();
  const [isOpen, setIsoOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    if (!id) {
      console.error("ID parameter is undefined");
      return;
    }

    const fetchInvoice = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/api/invoices/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch invoice');
        }

        const invoiceData = await response.json();
        setInvoice(invoiceData);
      } catch (error) {
        console.error('Error fetching invoice:', error);
        toast.error('Failed to fetch invoice');
      }
    };

    fetchInvoice();
  }, [id]);

  const calculateSubtotal = useCallback((items) => {
    let subtotal = 0;
    items.forEach((item) => {
      subtotal += item.price * item.quantity;
    });
    return subtotal;
  }, []);

  const calculateGrandTotal = useCallback((subtotal, discount, tax) => {
    const discountedAmount = subtotal - (subtotal * discount) / 100;
    const totalWithTax = discountedAmount + (discountedAmount * tax) / 100;
    return totalWithTax;
  }, []);

  const convertToPDF = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      const capture = document.querySelector('.actual-receipt');
  
      if (!capture) {
        reject(new Error("Element not found"));
        return;
      }
  
      try {
        const html2canvas = (await import('html2canvas')).default;
        const jsPDF = (await import('jspdf')).default;
        
        html2canvas(capture, { scale: 2, useCORS: true })
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const doc = new jsPDF('p', 'mm', 'a4');
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const imgWidth = pageWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;
    
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
    
            while (heightLeft > 0) {
              position = heightLeft - imgHeight;
              doc.addPage();
              doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
              heightLeft -= pageHeight;
            }
    
            resolve(doc);
          })
          .catch(reject);
      } catch (err) {
        reject(err);
      }
    });
  }, []);

  const downloadPDF = useCallback(async () => {
    const capture = document.querySelector('.actual-receipt');
    if (!capture) return;
  
    setLoader(true);
  
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;
      
      html2canvas(capture, { scale: 2, useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF('p', 'mm', 'a4');
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
    
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
    
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
    
        setLoader(false);
        doc.save('invoice.pdf');
      }).catch((error) => {
        console.error('Error downloading PDF:', error);
        setLoader(false);
      });
    } catch (err) {
      console.error('Error loading PDF dependencies:', err);
      setLoader(false);
    }
  }, []);

  const printPDF = useCallback(() => {
    const content = document.querySelector(".actual-receipt");
    if (!content) return;
  
    const printWindow = window.open("", "", "width=900,height=650");
  
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            @page {
              size: A4;
              margin: 10mm;
            }
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
              -webkit-print-color-adjust: exact;
            }
            .print-container {
              width: 190mm;
              margin: 0 auto;
              padding: 10mm;
              box-sizing: border-box;
            }
            .print-container * {
              box-sizing: border-box !important;
            }
            img {
              max-width: 120px !important;
              height: auto !important;
            }
            .print-container * {
              margin: 0 !important;
              padding: 0 !important;
            }
            .print-container p,
            .print-container div,
            .print-container h1,
            .print-container h2,
            .print-container h3,
            .print-container td,
            .print-container th {
              margin-bottom: 6px !important;
            }
            table {
              width: 100% !important;
              border-collapse: collapse !important;
            }
            td, th {
              padding: 6px !important;
              text-align: left;
              vertical-align: top;
            }
            .print-container * {
              float: none !important;
              position: static !important;
            }
            .actual-receipt {
              transform: none !important;
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            ${content.innerHTML}
          </div>
        </body>
      </html>
    `);
  
    printWindow.document.close();
    printWindow.focus();
  
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  }, []);

  return {
    invoice,
    isOpen,
    setIsoOpen,
    isShareOpen,
    setIsShareOpen,
    loader,
    calculateSubtotal,
    calculateGrandTotal,
    convertToPDF,
    downloadPDF,
    printPDF,
  };
}
