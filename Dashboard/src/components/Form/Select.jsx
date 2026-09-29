import React from "react";
import { Listbox } from "@headlessui/react";

export function Select({ selectedPerson, setSelectedPerson, datas, children }) {
  return (
    <div className="text-sm relative w-full">
      <Listbox value={selectedPerson} onChange={setSelectedPerson}>
        <Listbox.Button className="w-full">{children}</Listbox.Button>

        <Listbox.Options className="flex flex-col gap-2 top-14 z-50 absolute left-0 w-full bg-white rounded-md shadow-lg py-1 ring-1 ring-border focus:outline-none">
          {datas.map((person) => (
            <Listbox.Option
              key={person._id || person.value || person.name}
              value={person}
              disabled={person.unavailable}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {person.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
