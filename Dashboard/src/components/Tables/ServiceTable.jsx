import React from "react";
import { MenuSelectss } from "../Form";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-hot-toast";
import axios from "axios";
import BASE_URL from "../../baseUrl.jsx";

const thclass = "text-start text-[11px] font-bold uppercase tracking-wider text-textGray py-2 px-2 border-b border-border bg-gray-50/70";
const tdclass = "text-start text-xs py-2 px-2 text-main/90 border-b border-border/80 align-middle";

export function ServiceTable({ data, onEdit, onDelete, setServicesData }) {
  const DropDown1 = [
    {
      title: "Edit",
      icon: FiEdit,
      onClick: (item) => {
        onEdit(item);
      },
    },
    {
      title: "Delete",
      icon: RiDeleteBin6Line,
      onClick: (item) => {
        onDelete(item);
      },
    },
  ];

  const handleStatusToggle = async (item) => {
    try {
      const updatedItem = { ...item, status: !item.status };
      await axios.put(`${BASE_URL}/api/services/${item._id}`, updatedItem);
      const updatedResponse = await axios.get(`${BASE_URL}/api/services`);
      setServicesData(updatedResponse.data);
      toast.success("Service status updated successfully.");
    } catch (error) {
      console.error("Error updating service status:", error);
      toast.error("Failed to update service status. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <table className="w-full text-left border-collapse table-fixed">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={`${thclass} w-[30%] sm:w-[35%]`}>Service Name</th>
            <th className={`${thclass} w-[22%] sm:w-[22%] whitespace-nowrap`}>Created At</th>
            <th className={`${thclass} w-[18%] sm:w-[15%] whitespace-nowrap`}>
              Price <span className="text-[10px] font-normal text-textGray">(Tsh)</span>
            </th>
            <th className={`${thclass} w-[16%] sm:w-[15%] whitespace-nowrap`}>Status</th>
            <th className={`${thclass} w-[14%] sm:w-[13%] text-right whitespace-nowrap`}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item._id}
              className="border-b border-border hover:bg-greyed transitions"
            >
              <td className={tdclass}>
                <h4 className="text-xs font-bold text-main truncate w-full" title={item?.name}>
                  {item?.name}
                </h4>
              </td>
              <td className={`${tdclass} whitespace-nowrap`}>
                {item?.createdAt ? new Date(item?.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }) : 'N/A'}
              </td>
              <td className={`${tdclass} font-bold text-main whitespace-nowrap`}>{item?.price}</td>
              <td className={`${tdclass} whitespace-nowrap`}>
                <span
                  className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold border cursor-pointer transition-colors duration-150 ${item?.status 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100" 
                      : "bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100"
                    }`}
                  onClick={() => handleStatusToggle(item)}
                  title="Click to toggle status"
                >
                  <span className={`w-1.5 h-1.5 rounded-full mr-1 ${item?.status ? "bg-emerald-500" : "bg-rose-500"}`}></span>
                  {item?.status ? "Active" : "Disabled"}
                </span>
              </td>
              <td className={`${tdclass} whitespace-nowrap`}>
                <div id="tour-service-actions" className="flex items-center justify-end gap-1">
                  <button
                    onClick={() => onEdit(item)}
                    className="p-1 sm:p-1.5 text-subMain hover:bg-subMain/10 border border-subMain/20 rounded-md transition-colors cursor-pointer flex items-center justify-center"
                    title="Edit Service"
                  >
                    <FiEdit size={13} />
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="p-1 sm:p-1.5 text-red-500 hover:bg-red-50 border border-red-200 rounded-md transition-colors cursor-pointer flex items-center justify-center"
                    title="Delete Service"
                  >
                    <RiDeleteBin6Line size={13} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
