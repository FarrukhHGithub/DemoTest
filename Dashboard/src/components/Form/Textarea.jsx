import React from "react";

export function Textarea({ label, name, value, onChange, placeholder, rows }) {
  const handleChange = (e) => {
    console.log("Textarea onChange event:", e);
    console.log("Textarea value:", e.target.value);
    onChange(e);
  };

  return (
    <div className="text-xs sm:text-sm w-full">
      <label className="text-slate-700 text-xs font-semibold">{label}</label>
      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="focus:border-subMain focus:outline-none w-full bg-transparent text-xs sm:text-sm mt-1.5 py-2.5 px-3 border border-border rounded-lg font-normal text-main"
      />
    </div>
  );
}
