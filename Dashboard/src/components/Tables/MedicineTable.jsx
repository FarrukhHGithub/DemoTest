import React from "react";
import { MenuSelectss } from "../Form";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const thclass = "border-b border-border py-2.5 px-3 text-left font-semibold text-[11px] uppercase tracking-wider text-textGray bg-gray-50/70 whitespace-nowrap";
const tdclass = "border-b border-border py-2.5 px-3 text-xs text-main/90 whitespace-nowrap align-middle";

export function MedicineTable({ data, onEdit, onDelete }) {
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

  return (
    <div className="w-full overflow-x-auto">
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclass}>Name</th>
            <th className={thclass}>
              Price <span className="text-xs font-light">(Tsh)</span>
            </th>
            <th className={thclass}>InStock</th>
            <th className={thclass}>Measure</th>
            <th className={thclass}>Description</th>
            <th className={thclass}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) &&
            data.map((item) => (
              <tr
                key={item._id}
                className="border-b border-border hover:bg-greyed transitions"
              >
                <td className={tdclass}>
                  <h4 className="text-sm font-medium">{item?.medicineName}</h4>
                </td>
                <td className={`${tdclass} font-semibold`}>{item?.price}</td>
                <td className={tdclass}>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${item?.inStock 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                        : "bg-rose-50 text-rose-700 border-rose-100"
                      }`}
                  >
                    {item?.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className={tdclass}>{item?.measure}</td>
                <td className={tdclass}>{item?.description}</td>
                <td className={tdclass}>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-1.5 text-subMain hover:bg-subMain/10 border border-subMain/20 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
                      title="Edit Medicine"
                    >
                      <FiEdit size={15} />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="p-1.5 text-red-500 hover:bg-red-50 border border-red-200 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
                      title="Delete Medicine"
                    >
                      <RiDeleteBin6Line size={15} />
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
