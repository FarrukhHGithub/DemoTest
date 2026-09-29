import React from "react";
import { FiEye } from "react-icons/fi";

const thclass = "text-start text-[11px] font-semibold uppercase tracking-wider text-textGray py-2.5 px-3 border-b border-border bg-gray-50/70 whitespace-nowrap";
const tdclass = "text-start text-xs py-2.5 px-3 whitespace-nowrap text-main/90 border-b border-border/80 align-middle";

export function PaymentTable({ data, functions, doctor }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclass}>Date</th>
            <th className={thclass}>{doctor ? "Patient" : "Doctor"}</th>
            <th className={thclass}>Status</th>
            <th className={thclass}>Amount</th>
            <th className={thclass}>Method</th>
            <th className={thclass}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-b border-border hover:bg-greyed transitions"
            >
              <td className={tdclass}>
                <p className="text-xs">{item.date}</p>
              </td>
              <td className={tdclass}>
                <h4 className="text-xs font-medium">
                  {doctor ? item.user.title : item.doctor.title}
                </h4>
                <p className="text-xs mt-1 text-textGray">
                  {doctor ? item.user.phone : item.doctor.phone}
                </p>
              </td>
              <td className={tdclass}>
                <span
                  className={`py-1  px-4 ${item.status === "Paid"
                      ? "bg-subMain text-subMain"
                      : item.status === "Pending"
                        ? "bg-orange-500 text-orange-500"
                        : item.status === "Cancel" && "bg-red-600 text-red-600"
                    } bg-opacity-10 text-xs rounded-xl`}
                >
                  {item.status}
                </span>
              </td>
              <td className={tdclass}>
                <p className="text-xs font-semibold">{`$${item.amount}`}</p>
              </td>
              <td className={tdclass}>
                <p className="text-xs">{item.method}</p>
              </td>

              <td className={tdclass}>
                <button
                  onClick={() => functions.preview(item.id)}
                  className="text-sm flex-colo bg-white text-subMain border rounded-md w-10 h-10 animate-none flex items-center justify-center"
                >
                  <FiEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
