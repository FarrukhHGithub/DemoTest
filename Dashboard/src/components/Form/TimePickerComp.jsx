import React from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

export function TimePickerComp({ label, time, onChange }) {
  return (
    <div className="text-sm w-full">
      <label className="text-black text-sm">{label}</label>
      <Datetime
        value={time}
        onChange={(date) => onChange(date.toDate())}
        inputProps={{
          className:
            "w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-subMain",
        }}
        dateFormat={false}
        timeFormat="h:mm A"
      />
    </div>
  );
}
