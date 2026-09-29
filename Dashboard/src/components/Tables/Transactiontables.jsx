import React from "react";
import { MenuSelectss } from "../Form";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import BASE_URL from "../../baseUrl.jsx";
import { toast } from "react-hot-toast";

const thclass = "text-start text-xs font-semibold uppercase tracking-wider text-textGray py-3 px-4 border-b border-border bg-gray-50/70 whitespace-nowrap";
const tdclass = "text-start text-sm py-3.5 px-4 whitespace-nowrap text-main/90 border-b border-border/80 align-middle";

export function Transactiontables({
  data,
  action,
  updatedData,
  setUpdatedData,
}) {
  const handleStatusChange = (e, itemId) => {
    const updatedItems = data.map((item) => {
      if (item._id === itemId) {
        return {
          ...item,
          status: e.target.value,
        };
      }
      return item;
    });
    setUpdatedData(updatedItems);
  };

  const handleUpdate = (itemId) => {
    const itemToUpdate = updatedData.find((item) => item._id === itemId._id);
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/api/web/${itemToUpdate._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: itemToUpdate.status,
        method: itemToUpdate.method,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update status or method");
        }
        toast.success("Transaction updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating status or method:", error.message);
        toast.error("Failed to update transaction.");
      });
  };

  const DropDown1 = [
    {
      title: "Update",
      icon: FiEdit,
      onClick: handleUpdate,
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclass}>#</th>
            <th className={thclass}>Patient</th>
            <th className={thclass}>Date</th>
            <th className={thclass}>Status</th>
            <th className={thclass}>
              Amount <span className="text-xs font-light">(Tsh)</span>
            </th>
            <th className={thclass}>Method</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className="border-b border-border hover:bg-greyed transitions"
            >
              <td className={tdclass}>{index + 1}</td>
              <td className={tdclass}>
                <div className="flex gap-4 items-center">
                  <span className="w-12">
                    <img
                      src={`${BASE_URL}/${item.patientInfo.image}`}
                      alt={item.patientInfo.name}
                      className="w-full h-12 rounded-full object-cover border border-border"
                    />
                  </span>
                  <div>
                    <h4 className="text-sm font-medium">
                      {item.patientInfo.name}
                    </h4>
                    <p className="text-xs mt-1 text-textGray">
                      {item.patientInfo.emergencyContact}
                    </p>
                  </div>
                </div>
              </td>
              <td className={tdclass}>
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className={tdclass}>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                  item.status === "Approved"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                    : item.status === "Pending"
                      ? "bg-amber-50 text-amber-700 border-amber-100"
                      : "bg-rose-50 text-rose-700 border-rose-100"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                    item.status === "Approved"
                      ? "bg-emerald-500"
                      : item.status === "Pending"
                        ? "bg-amber-500"
                        : "bg-rose-500"
                  }`}></span>
                  {item.status}
                </span>
              </td>
              <td className={`${tdclass} font-semibold`}>
                {item?.appointments?.[0]?.selectedService?.price || 0}
              </td>
              <td className={tdclass}>{item.method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
