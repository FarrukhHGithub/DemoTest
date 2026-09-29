import React from "react";
import { FiEye } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../baseUrl.jsx";

export function InvoicePaidTable({ data }) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${BASE_URL}/api/invoices/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Invoice deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete invoice");
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[700px]">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className="py-2.5 px-3 text-left font-semibold text-[11px] uppercase tracking-wider text-textGray border-b border-border bg-gray-50/70 whitespace-nowrap">#</th>
            <th className="py-2.5 px-3 text-left font-semibold text-[11px] uppercase tracking-wider text-textGray border-b border-border bg-gray-50/70 whitespace-nowrap">Patient</th>
            <th className="py-2.5 px-3 text-left font-semibold text-[11px] uppercase tracking-wider text-textGray border-b border-border bg-gray-50/70 whitespace-nowrap">Date</th>
            <th className="py-2.5 px-3 text-left font-semibold text-[11px] uppercase tracking-wider text-textGray border-b border-border bg-gray-50/70 whitespace-nowrap">Amount</th>
            <th className="py-2.5 px-3 text-left font-semibold text-[11px] uppercase tracking-wider text-textGray border-b border-border bg-gray-50/70 whitespace-nowrap">Status</th>
            <th className="py-2.5 px-3 text-left font-semibold text-[11px] uppercase tracking-wider text-textGray border-b border-border bg-gray-50/70 whitespace-nowrap">Action</th>
          </tr>
        </thead>

        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item._id} className="border-b border-border hover:bg-greyed transitions">
                <td className="py-2.5 px-3 text-xs text-main/90 whitespace-nowrap">{index + 1}</td>
                <td className="py-2.5 px-3 text-xs text-main/90 whitespace-nowrap">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={`${BASE_URL}/${item.patient?.profilePicture}`}
                      alt="patient"
                      className="w-8 h-8 rounded-full object-cover border border-border"
                      onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/40?text=User")
                      }
                    />
                    <span className="whitespace-nowrap font-medium text-main">
                      {item.patient?.fullName}
                    </span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-xs text-main/90 whitespace-nowrap">
                  {new Date(item.createdDate).toLocaleDateString()}
                </td>
                <td className="py-2.5 px-3 text-xs font-semibold text-main whitespace-nowrap">
                  Rs. {item.total}
                </td>
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border bg-emerald-50 text-emerald-700 border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-emerald-500"></span>
                    Paid
                  </span>
                </td>
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => navigate(`/invoices/preview/${item._id}`)}
                      className="text-subMain hover:text-opacity-80 text-lg transition-colors p-1"
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700 text-lg transition-colors p-1"
                    >
                      <BiTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-5 text-gray-500">
                No invoices found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
