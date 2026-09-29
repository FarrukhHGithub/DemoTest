import React from "react";

export function Input({
  label,
  name,
  type,
  color,
  placeholder,
  onChange,
  value,
}) {
  return (
    <div className="text-xs sm:text-sm w-full">
      <label
        className={`${color ? "text-slate-700 text-xs font-semibold" : "text-white font-semibold"} `}
      >
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-transparent text-xs sm:text-sm mt-1.5 py-2.5 px-3 border ${
          color ? "border-border font-normal text-main" : "border-white text-white"
        } rounded-lg focus:border focus:border-subMain focus:outline-none`}
      />
    </div>
  );
}
