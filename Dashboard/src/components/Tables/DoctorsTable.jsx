import React from "react";
import { MenuSelectss } from "../Form";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FiEye } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import BASE_URL from "../../baseUrl.jsx";

const thclass = "py-2.5 px-3 text-left font-semibold text-[11px] uppercase tracking-wider text-textGray border-b border-border bg-gray-50/70 whitespace-nowrap";
const tdclass = "py-2.5 px-3 text-xs text-main/90 border-b border-border/80 align-middle whitespace-nowrap";

export function DoctorsTable({ data, functions, doctor }) {
  const DropDown1 = [
    {
      title: "View",
      icon: FiEye,
      onClick: (data) => {
        functions.preview(data);
      },
    },
    {
      title: "Delete",
      icon: RiDeleteBin6Line,
      onClick: (data) => {
        functions.delete(data.id);
      },
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclass}>#</th>
            <th className={thclass}>{doctor ? "Doctor" : "Receptionist"}</th>
            <th className={thclass}>FullName</th>
            <th className={thclass}>Created At</th>
            <th className={thclass}>Phone</th>
            <th className={thclass}>Email</th>
            <th className={thclass}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item._id}
              className="border-b border-border hover:bg-greyed transitions"
            >
              <td className={tdclass}>{index + 1}</td>
              <td className={tdclass}>
                <div className="flex gap-2.5 items-center">
                  <span className="w-8 h-8 flex-shrink-0">
                    <img
                      src={`${BASE_URL}/${item.profileImage}`}
                      className="w-full h-8 rounded-full object-cover border border-border"
                      alt="Profile"
                    />
                  </span>
                </div>
              </td>
              <td className={tdclass}>{item.fullName}</td>
              <td className={tdclass}>{item.createdAt}</td>
              <td className={tdclass}>{item.phone}</td>
              <td className={tdclass}>{item.email}</td>
              <td className={tdclass}>
                <MenuSelectss datas={DropDown1} item={item}>
                  <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
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
