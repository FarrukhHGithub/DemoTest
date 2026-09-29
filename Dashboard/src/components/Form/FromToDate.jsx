import React from "react";
import DatePicker from "react-datepicker";

export function FromToDate({ label, startDate, onChange, endDate, bg }) {
  return (
    <div className="text-sm w-full flex flex-col gap-2">
      {label && <label className="text-black text-sm">{label}</label>}
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={onChange}
        className={`w-full ${bg ? bg : "bg-transparent"} text-xs px-4 h-14 border border-border text-main font-normal rounded-lg focus:border focus:border-subMain`}
      />
    </div>
  );
}
