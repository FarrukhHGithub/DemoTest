import React, { useMemo } from "react";
import { MenuSelectss } from "../Form";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import BASE_URL from "../../baseUrl.jsx";

const tdclass =
  "text-start text-xs py-2.5 px-3 whitespace-nowrap text-main/90 border-b border-border/80 align-middle";

export const TransactionRow = React.memo(function TransactionRow({
  item,
  index,
  action,
  dropDownOptions,
  handleStatusChange,
}) {
  return (
    <tr className="border-b border-border hover:bg-greyed transitions">
      <td className={tdclass}>{index + 1}</td>
      <td className={tdclass}>
        <div className="flex gap-2.5 items-center">
          <span className="w-8 h-8 flex-shrink-0">
            <img
              src={`${BASE_URL}/${item.patientInfo.image}`}
              alt={item.patientInfo.name}
              className="w-full h-8 rounded-full object-cover border border-border"
            />
          </span>

          <div>
            <h4 className="text-xs font-semibold text-main">
              {item.patientInfo.name}
            </h4>
            <p className="text-[11px] text-textGray">
              {item.patientInfo.emergencyContact}
            </p>
          </div>
        </div>
      </td>
      <td className={tdclass}>
        {new Date(item.createdAt).toLocaleDateString()}
      </td>
      <td className={tdclass}>
        <div className="relative inline-block w-48">
          <select
            value={item.status}
            onChange={(e) => handleStatusChange(e, item._id)}
            className={`w-full text-xs rounded-full py-1.5 pl-3 pr-8 font-medium border appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-subMain transition-all ${
              item.status === "Approved" || item.status === "Paid"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : item.status === "Pending"
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-rose-50 text-rose-700 border-rose-200"
            }`}
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 text-[10px]">
            ▼
          </span>
        </div>
      </td>
      <td className={`${tdclass} font-semibold`}>
        ${item.price?.toFixed(2) || "0.00"}
      </td>
      <td className={tdclass}>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            item.method === "Online"
              ? "bg-blue-100 text-blue-800"
              : "bg-purple-100 text-purple-800"
          }`}
        >
          {item.method || "N/A"}
        </span>
      </td>
      {action && (
        <td className={tdclass}>
          <MenuSelectss
            datas={dropDownOptions}
            item={{
              ...item,
              id: item.id,
              patientId: item.patientId,
              appointmentData: item,
            }}
          >
            <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg cursor-pointer">
              <BiDotsHorizontalRounded />
            </div>
          </MenuSelectss>
        </td>
      )}
    </tr>
  );
});
