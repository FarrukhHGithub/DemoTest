import { useState, useCallback } from "react";
import axios from "axios";
import { sortsDatas } from "../../components/Datas";
import { toast } from "react-hot-toast";
import BASE_URL from "../../baseUrl.jsx";

export function useCreateInvoice() {
  const [dateRange, setDateRange] = useState([
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 7)),
  ]);
  const [currency, setCurrency] = useState(sortsDatas.currency[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(sortsDatas.currency[0]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [notes, setNotes] = useState("Thank you for your business. We hope to work with you again soon.");

  const [startDate, endDate] = dateRange;

  const onChangeDates = useCallback((update) => {
    setDateRange(update);
  }, []);

  const handleAddItemClick = useCallback(() => {
    setItemOpen(true);
  }, []);

  const handleSelectPatient = useCallback((patient) => {
    setSelectedPatient(patient);
  }, []);

  const calculateSubtotalValue = useCallback((price, quantity) => {
    return price * quantity;
  }, []);

  const calculateGrandTotal = useCallback((subTotal, discount, tax) => {
    const total = subTotal - discount + tax;
    setGrandTotal(total);
  }, []);

  const handleAddItem = useCallback((service, quantity) => {
    const newItem = {
      _id: service._id,
      name: service.name,
      price: service.price,
      quantity: parseInt(quantity),
      subtotal: calculateSubtotalValue(service.price, quantity)
    };

    const updatedInvoiceItems = [...invoiceItems, newItem];
    setInvoiceItems(updatedInvoiceItems);

    const newSubtotal = updatedInvoiceItems.reduce((acc, item) => acc + item.subtotal, 0);
    setSubtotal(newSubtotal);

    calculateGrandTotal(newSubtotal, discount, tax);
    setSelectedService(service);
  }, [invoiceItems, discount, tax, calculateSubtotalValue, calculateGrandTotal]);

  const handleSaveInvoice = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(`${BASE_URL}/api/invoices`, {
        selectedPatient,
        invoiceItems,
        tax,
        discount,
        grandTotal,
        currency: selectedCurrency,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Invoice saved successfully");
      return response.data;
    } catch (error) {
      toast.error("Error saving invoice");
    }
  }, [selectedPatient, invoiceItems, tax, discount, grandTotal, selectedCurrency]);

  const handleCurrencyChange = useCallback((selCurrency) => {
    setCurrency(selCurrency);
    setSelectedCurrency(selCurrency);

    const exchangeRates = {
      USD: 1,
      EUR: 0.66,
      PKR: 278.96
    };

    const updatedItems = invoiceItems.map(item => {
      const price = typeof item.price === 'number' ? item.price : 0;
      const convertedPrice = price * exchangeRates[selCurrency.name.split(' ')[0]];
      const sub = convertedPrice * item.quantity;
      return {
        ...item,
        subtotal: sub
      };
    });

    setInvoiceItems(updatedItems);

    const newSubtotal = updatedItems.reduce((acc, item) => acc + item.subtotal, 0);
    setSubtotal(newSubtotal);

    calculateGrandTotal(newSubtotal, discount, tax);
  }, [invoiceItems, discount, tax, calculateGrandTotal]);

  const handleSendEmail = useCallback(() => {
    if (!selectedPatient?.email) {
      toast.error("Select patient with email");
      return;
    }

    const subject = encodeURIComponent("Your Invoice Details");
    const body = encodeURIComponent(`
Hello ${selectedPatient.fullName},

Here is your invoice summary:

-----------------------------
Subtotal: ${subtotal}
Discount: ${discount}
Tax: ${tax}
Grand Total: ${grandTotal}

Notes:
${notes || "N/A"}
-----------------------------

Invoice Items:
${invoiceItems
  .map(
    (item, i) =>
      `${i + 1}. ${item.name} | Qty: ${item.quantity} | Price: ${item.price} | Total: ${item.subtotal}`
  )
  .join("\n")}

Thank you for your business.
`);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${
      selectedPatient.email
    }&su=${subject}&body=${body}`;

    window.open(gmailUrl, "_blank");
  }, [selectedPatient, subtotal, discount, tax, grandTotal, notes, invoiceItems]);

  const handleSendWhatsApp = useCallback(() => {
    if (!selectedPatient?.emergencyContact) {
      toast.error("No phone number found");
      return;
    }

    const message = encodeURIComponent(`
Hello ${selectedPatient.fullName},

Invoice Details:

Subtotal: ${subtotal}
Discount: ${discount}
Tax: ${tax}
Grand Total: ${grandTotal}

Items:
${invoiceItems
  .map(
    (item, i) =>
      `${i + 1}. ${item.name} (Qty: ${item.quantity}) = ${item.subtotal}`
  )
  .join("\n")}

Notes:
${notes || "N/A"}

Thank you!
`);

    const phone = selectedPatient.emergencyContact.replace(/\D/g, "");
    const url = `https://wa.me/${phone}?text=${message}`;

    window.open(url, "_blank");
  }, [selectedPatient, subtotal, discount, tax, grandTotal, invoiceItems, notes]);

  const deleteItem = useCallback((itemId) => {
    const updatedItems = invoiceItems.filter((item) => item._id !== itemId);
    setInvoiceItems(updatedItems);

    const newSubtotal = updatedItems.reduce((acc, item) => acc + item.subtotal, 0);
    setSubtotal(newSubtotal);

    calculateGrandTotal(newSubtotal, discount, tax);
    toast.success('Item deleted successfully');
  }, [invoiceItems, discount, tax, calculateGrandTotal]);

  const handleSubtotalChange = useCallback((event) => {
    const newSubtotal = parseFloat(event.target.value) || 0;
    setSubtotal(newSubtotal);
    calculateGrandTotal(newSubtotal, discount, tax);
  }, [discount, tax, calculateGrandTotal]);

  const handleDiscountChange = useCallback((event) => {
    const newDiscount = parseFloat(event.target.value) || 0;
    setDiscount(newDiscount);
    calculateGrandTotal(subtotal, newDiscount, tax);
  }, [subtotal, tax, calculateGrandTotal]);

  const handleTaxChange = useCallback((event) => {
    const newTax = parseFloat(event.target.value) || 0;
    setTax(newTax);
    calculateGrandTotal(subtotal, discount, newTax);
  }, [subtotal, discount, calculateGrandTotal]);

  const handleNotesChange = useCallback((event) => {
    setNotes(event.target.value);
  }, []);

  return {
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
  };
}
