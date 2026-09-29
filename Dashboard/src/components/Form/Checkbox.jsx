import React from "react";
import { FaCheck } from "react-icons/fa";

export function Checkbox({ label, name, onChange, checked }) {
  return (
    <div className="text-sm w-full flex flex-row items-center">
      <label className="flex flex-col items-center cursor-pointer relative">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={() => onChange(!checked)}
          className="absolute opacity-0 w-0 h-0"
        />
        <span
          className={`border rounded w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
            checked ? "border-subMain bg-subMain" : "border-gray-300 bg-white"
          }`}
        >
          {checked && <FaCheck className="text-[10px] block text-white" />}
        </span>
      </label>

      {label && <p className="text-black text-xs ml-2">{label}</p>}
    </div>
  );
}
