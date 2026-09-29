import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import Loader from "../../components/Notifications/Loader";
import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { InvoiceTable } from "../../components/Tables";
import { toast } from "react-hot-toast";
import axios from "axios";
import BASE_URL from "../../baseUrl.jsx";

function Invoices() {
  const [invoicesData, setInvoicesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/invoices`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInvoicesData(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
        toast.error("Error fetching invoices");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const deleteInvoice = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/api/invoices/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInvoicesData(invoicesData.filter((invoice) => invoice._id !== id));
      toast.success("Invoice deleted successfully");
    } catch (error) {
      console.error("Error deleting invoice:", error);
      toast.error("Error deleting invoice");
    }
  };
  const updateInvoiceData = (updatedInvoice) => {
    setInvoicesData(
      invoicesData.map((invoice) => {
        if (invoice._id === updatedInvoice._id) {
          return updatedInvoice;
        }
        return invoice;
      })
    );
  };
  return (
    <Layout>
      <Link
        to="/invoices/create"
        id="tour-add-invoice"
        className="w-12 h-12 animate-bounce border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-6 right-8 button-fb shadow-md hover:bg-opacity-90 flex items-center justify-center"
      >
        <BiPlus className="text-xl" />
      </Link>

      <h1 className="text-lg sm:text-xl font-bold text-main">Invoices</h1>

      <div
        id="tour-invoices"
        className="bg-white my-5 rounded-xl border border-border p-4 sm:p-5 shadow-xs"
      >
        <div className="grid md:grid-cols-6 sm:grid-cols-2 grid-cols-1 gap-2">
          <div className="md:col-span-5 grid lg:grid-cols-4 items-center gap-6">
            {/* <input
          type="text"
          placeholder='Search "patient name"'
          className="h-14 w-full text-sm text-main rounded-md bg-dry border border-border px-4"
        /> */}
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="mt-8 w-full overflow-x-auto">
            {invoicesData && invoicesData.length > 0 ? (
              <InvoiceTable
                data={invoicesData}
                deleteInvoice={deleteInvoice}
                updateInvoiceData={updateInvoiceData}
              />
            ) : (
              <div className="text-center py-10 text-gray-500">
                No invoices found
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Invoices;
