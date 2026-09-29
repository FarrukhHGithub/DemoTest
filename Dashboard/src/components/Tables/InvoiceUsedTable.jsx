import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FiEye } from "react-icons/fi";

const thclass = "text-start text-xs font-semibold uppercase tracking-wider text-textGray py-3 px-4 border-b border-border bg-gray-50/70 whitespace-nowrap";
const tdclass = "text-start text-sm py-3.5 px-4 whitespace-nowrap text-main/90 border-b border-border/80 align-middle";

export function InvoiceUsedTable({ data, functions }) {
  const [idCounter] = useState(2623); // Initialize the ID counter

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div className="w-full overflow-x-auto border border-border rounded-xl">
      <table className="table-auto w-full border-collapse">
        <thead className="bg-dry border-b border-border">
          <tr>
            <th className={thclass}>Invoice ID</th>
            <th className={thclass}>Create Date</th>
            <th className={thclass}>Due Date</th>
            <th className={thclass}>Amount</th>
            <th className={thclass} style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={uuidv4()}
              className="border-b border-border hover:bg-greyed transitions"
            >
              <td className={tdclass}>#{idCounter + index}</td>
              <td className={tdclass}>
                <p className="text-xs font-medium text-main">{formatDate(item.createdDate)}</p>
              </td>
              <td className={tdclass}>
                <p className="text-xs text-textGray">{formatDate(item.dueDate)}</p>
              </td>
              <td className={tdclass}>
                <p className="text-xs font-bold text-emerald-600">{`$${item.total}`}</p>
              </td>
              <td className={tdclass} style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={() => functions.preview(item._id)}
                  className="p-2.5 bg-blue-50 text-subMain hover:bg-subMain hover:text-white rounded-xl border border-blue-100/50 transition duration-200 text-xs shadow-sm flex items-center justify-center"
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
