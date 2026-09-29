import React from "react";
import { Switch } from "@headlessui/react";

export function Switchi({ checked, onChange }) {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={`${checked ? "bg-subMain" : "bg-border"}
        relative inline-flex p-[2px] w-12 cursor-pointer rounded-full transitions`}
    >
      <span
        aria-hidden="true"
        className={`${checked ? "translate-x-5" : "translate-x-0"}
          pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transitions`}
      />
    </Switch>
  );
}
