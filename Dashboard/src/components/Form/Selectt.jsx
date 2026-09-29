import React, { useState } from "react";
import { Listbox } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";

export function Selectt({ selectedPerson, setSelectedPerson, datas }) {
  const [active, setActive] = useState(null);

  return (
    <>
      {Array.isArray(datas) && datas.length > 0 ? (
        <div className="relative w-full">
          <Listbox value={selectedPerson} onChange={setSelectedPerson}>
            {({ open }) => (
              <>
                <Listbox.Button className="h-14 text-sm text-main rounded-md bg-dry border border-border px-4 w-full flex justify-between items-center focus:outline-none focus:border-subMain">
                  <span>{selectedPerson}</span>
                  <BiChevronDown
                    className={`text-xl ${open ? "transform rotate-180" : ""}`}
                  />
                </Listbox.Button>
                {open && (
                  <Listbox.Options className="flex flex-col gap-2 top-14 z-50 absolute left-0 w-full bg-white rounded-md shadow-lg py-1 ring-1 ring-border focus:outline-none">
                    {datas.map((doctor, index) => (
                      <Listbox.Option
                        key={index}
                        value={doctor}
                        className={({ active, selected }) =>
                          `cursor-pointer px-4 py-2 hover:text-subMain hover:bg-subMain hover:bg-opacity-10 ${
                            selected ? "font-bold" : ""
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {doctor}
                            </span>
                            {selected && (
                              <span
                                className={`absolute inset-y-0 right-0 flex items-center pr-3 text-subMain`}
                              >
                                ✓
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                )}
              </>
            )}
          </Listbox>
        </div>
      ) : (
        <p>No doctors available</p>
      )}
    </>
  );
}
