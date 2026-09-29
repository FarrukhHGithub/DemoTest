import React from "react";
import { BiSearch } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function PatientFilters({
  searchQuery,
  setSearchQuery,
  genderFilter,
  handleGenderFilterChange,
  startDate,
  setStartDate,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-textGray">
          <BiSearch className="text-lg" />
        </span>
        <input
          type="text"
          placeholder='Search "Patients"...'
          className="h-12 w-full text-sm text-main rounded-xl bg-dry border border-border pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-subMain focus:border-transparent transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="w-full">
        <select
          value={genderFilter}
          onChange={handleGenderFilterChange}
          className="h-12 w-full text-sm text-main rounded-xl bg-dry border border-border px-4 focus:outline-none focus:ring-2 focus:ring-subMain focus:border-transparent transition-all cursor-pointer"
        >
          <option value="all">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="w-full">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={startDate}
          placeholderText="Filter by date"
          className="h-12 w-full text-sm text-main rounded-xl bg-dry border border-border px-4 focus:outline-none focus:ring-2 focus:ring-subMain focus:border-transparent transition-all cursor-pointer"
        />
      </div>
    </div>
  );
}
