import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

export function MedicineDosageTable({ data, functions, button }) {
  const thClass = "text-start text-xs font-medium py-3 px-2 whitespace-nowrap";
  const tdClass = "text-start text-xs py-4 px-2 whitespace-nowrap";

  return (
    <div className="w-full overflow-x-auto">
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thClass}>Name</th>
            <th className={thClass}>Quantity</th>
            <th className={thClass}>Dosage</th>
            <th className={thClass}>Instruction</th>
            <th className={thClass}>Item Price (Tsh)</th>
            <th className={thClass}>Amount (Tsh)</th>
            {button && <th className={thClass}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data?.map((medicine) => (
            <tr
              key={medicine._id}
              className="border-b border-border hover:bg-greyed transitions"
            >
              <td className={tdClass}>{medicine.name}</td>
              <td className={tdClass}>{medicine.quantity}</td>
              <td className={tdClass}>{medicine.dosage}</td>
              <td className={tdClass}>{medicine.instructions}</td>
              <td className={tdClass}>{medicine.itemPrice}</td>
              <td className={tdClass}>{medicine.amount}</td>
              {button && (
                <td className={tdClass}>
                  <button
                    onClick={() => functions.delete(medicine._id)}
                    className="bg-red-600 bg-opacity-5 text-red-600 rounded-lg border border-red-100 py-3 px-4 text-sm"
                  >
                    <RiDeleteBinLine />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
