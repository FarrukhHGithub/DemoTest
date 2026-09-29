import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import Loader from "../../components/Notifications/Loader";
import { Button, FromToDate, Select } from "../../components/Form";
import { Transactiontable, InvoicePaidTable } from "../../components/Tables";
import { sortsDatas, transactionData } from "../../components/Datas";
import { BiChevronDown, BiTime } from "react-icons/bi";
import {
  MdFilterList,
  MdOutlineCalendarMonth,
  MdOutlineCloudDownload,
} from "react-icons/md";
import { toast } from "react-hot-toast";
import { BsCalendarMonth } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../baseUrl.jsx";

function Payments() {
  const [status, setStatus] = useState(sortsDatas.status[0]);
  const [method, setMethod] = useState(sortsDatas.method[0]);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const [invoiceData, setInvoiceData] = useState([]);

  const navigate = useNavigate();
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const [transRes, invRes] = await Promise.all([
          fetch(`${BASE_URL}/api/web/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${BASE_URL}/api/invoices`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (transRes.ok) {
          const transData = await transRes.ok ? await transRes.json() : [];
          setTransactionData(transData);
        } else {
          console.error("Failed to fetch transaction data");
        }

        if (invRes.ok) {
          const invData = await invRes.json();
          const paidOnly = invData.filter((item) => item.status === "paid");
          setInvoiceData(paidOnly);
        } else {
          console.error("Failed to fetch invoices");
        }
      } catch (error) {
        console.error("Error fetching payment data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [updatedData, setUpdatedData] = useState([]);

  useEffect(() => {
    setTransactionData(updatedData);
  }, [updatedData]);
  const sorts = [
    {
      id: 2,
      selected: status,
      setSelected: setStatus,
      datas: sortsDatas.status,
    },
    {
      id: 3,
      selected: method,
      setSelected: setMethod,
      datas: sortsDatas.method,
    },
  ];
  const boxes = [
    {
      id: 1,
      title: "Today Payments",
      value: "4,42,236",
      color: ["bg-subMain", "text-subMain"],
      icon: BiTime,
    },
    {
      id: 2,
      title: "Monthly Payments",
      value: "12,42,500",
      color: ["bg-orange-500", "text-orange-500"],
      icon: BsCalendarMonth,
    },
    {
      id: 3,
      title: "Yearly Payments",
      value: "345,70,000",
      color: ["bg-green-500", "text-green-500"],
      icon: MdOutlineCalendarMonth,
    },
  ];

  const editPayment = (id) => {
    navigate(`/payments/edit/${id}`);
  };

  return (
    <Layout>
      <h1 className="text-lg sm:text-xl font-bold text-main">Payments</h1>

      <div
        id="tour-payments-list"
        className="bg-white my-5 rounded-xl border border-border p-4 sm:p-5 shadow-xs"
      >
        <div className="grid lg:grid-cols-5 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2">
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className="text-sm font-bold text-main mt-4">Online Transactions</h2>
            <div id="tour-online-transactions-table" className="mt-4 w-full overflow-x-auto">
              <Transactiontable
                data={transactionData}
                action={true}
                updatedData={updatedData}
                setUpdatedData={setUpdatedData}
              />
              <h2 className="text-sm font-bold text-main mt-6">Paid Invoices</h2>
              <div id="tour-paid-invoices-table" className="bg-white my-4 rounded-xl border p-4">
                <div className="w-full overflow-x-auto">
                  <InvoicePaidTable data={invoiceData} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Payments;
