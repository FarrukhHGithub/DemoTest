import React from "react";
import DatePicker from "react-datepicker";

export function DatePickerComp({ label, startDate, onChange }) {
  return (
    <div className="text-sm w-full">
      <label className="text-black text-sm">{label}</label>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-subMain"
      />
    </div>
  );
}
