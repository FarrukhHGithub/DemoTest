import React, { useState } from "react";
import { MenuSelectss } from "../Form";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FiEye, FiCheckCircle } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../baseUrl.jsx";

const thclass = "text-start text-[11px] font-semibold uppercase tracking-wider text-textGray py-2.5 px-3 border-b border-border bg-gray-50/70 whitespace-nowrap";
const tdclass = "text-start text-xs py-2.5 px-3 whitespace-nowrap text-main/90 border-b border-border/80 align-middle";

export function InvoiceTable({ data, deleteInvoice, updateInvoiceData }) {
  const navigate = useNavigate();
  const [idCounter] = useState(2623); // Initialize the ID counter

  const DropDown1 = [
    {
      title: "View",
      icon: FiEye,
      onClick: (item) => {
        navigate(`/invoices/preview/${item._id}`);
      },
    },
    {
      title: "Mark as Paid",
      icon: FiCheckCircle,
      onClick: async (item) => {
        const updated = { ...item, status: "paid" };

        try {
          const token = localStorage.getItem("token");

          await axios.put(`${BASE_URL}/api/invoices/${item._id}`, updated, {
            headers: { Authorization: `Bearer ${token}` },
          });

          updateInvoiceData(updated);
          toast.success("Marked as paid");
        } catch (err) {
          toast.error("Failed to update status");
        }
      },
    },
    {
      title: "Delete",
      icon: RiDeleteBin6Line,
      onClick: (item) => {
        deleteInvoice(item._id);
      },
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclass}>Invoice ID</th>
            <th className={thclass}>Patient</th>
            <th className={thclass}>Created Date</th>
            <th className={thclass}>Due Date</th>
            <th className={thclass}>Status</th>
            <th className={thclass}>
              Amount <span className="text-xs font-light">(Tsh)</span>
            </th>
            <th className={thclass}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item._id}
              className="border-b border-border hover:bg-greyed transitions"
            >
              <td className={tdclass}>#{idCounter + index}</td>
              <td className={tdclass}>
                <div className="flex gap-2.5 items-center">
                  <span className="w-8 h-8 flex-shrink-0">
                    <img
                      src={`${BASE_URL}/${item?.patient?.profilePicture}`}
                      alt={item?.patient?.fullName}
                      className="w-full h-8 rounded-full object-cover border border-border"
                    />
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold text-main">
                      {item?.patient?.fullName}
                    </h4>
                    <p className="text-[11px] text-textGray">
                      {item?.patient?.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className={tdclass}>
                {new Date(item?.createdDate).toLocaleString()}
              </td>
              <td className={tdclass}>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${item.status === "paid"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                      : "bg-rose-50 text-rose-700 border-rose-100"
                    }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${item.status === "paid" ? "bg-emerald-500" : "bg-rose-500"}`}></span>
                  {item.status || "unpaid"}
                </span>
              </td>
              <td className={tdclass}>
                {new Date(item?.dueDate).toLocaleString()}
              </td>
              <td className={`${tdclass} font-semibold`}>{item?.total}</td>
              <td className={tdclass}>
                <MenuSelectss datas={DropDown1} item={item}>
                  <div id={index === 0 ? "tour-invoice-actions" : undefined} className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                    <BiDotsHorizontalRounded />
                  </div>
                </MenuSelectss>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
