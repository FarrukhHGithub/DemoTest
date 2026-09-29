import React from "react";
import moment from "moment";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { HiOutlineCalendarDays } from "react-icons/hi2";

export const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate("PREV");
  };

  const goToNext = () => {
    toolbar.onNavigate("NEXT");
  };

  const goToCurrent = () => {
    toolbar.onNavigate("TODAY");
  };

  const goToMonth = () => {
    toolbar.onView("month");
  };

  const goToWeek = () => {
    toolbar.onView("week");
  };

  const goToDay = () => {
    toolbar.onView("day");
  };

  const viewNamesGroup = [
    { view: "month", label: "Month" },
    { view: "week", label: "Week" },
    { view: "day", label: "Day" },
  ];

  const getHeaderText = () => {
    switch (toolbar.view) {
      case "month":
        return moment(toolbar.date).format("MMMM YYYY");

      case "week":
        return `${moment(toolbar.date)
          .startOf("week")
          .format("MMM D")} - ${moment(toolbar.date)
          .endOf("week")
          .format("MMM D, YYYY")}`;

      case "day":
        return moment(toolbar.date).format("dddd, MMMM D, YYYY");

      default:
        return moment(toolbar.date).format("MMMM YYYY");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xs border border-gray-200 mb-3">
      <div className="flex flex-wrap items-center justify-between p-2.5 sm:p-3 gap-2.5">
        {/* Left: Title and Today button */}
        <div className="flex items-center gap-2 shrink-0">
          <h2 className="text-sm sm:text-base font-bold text-gray-800">Appointments</h2>
          <button
            onClick={goToCurrent}
            className="px-2.5 py-1 text-xs font-semibold text-white bg-subMain hover:bg-opacity-90 rounded-md transition-colors shadow-xs cursor-pointer"
          >
            Today
          </button>
        </div>

        {/* Center: Month/Year navigation */}
        <div className="flex items-center justify-center gap-1 shrink-0">
          <button
            onClick={goToBack}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors border border-gray-200 text-gray-600 cursor-pointer"
            title="Previous"
          >
            <BiChevronLeft size={18} />
          </button>
          <span className="text-xs sm:text-sm font-bold text-gray-800 min-w-[120px] sm:min-w-[160px] text-center select-none">
            {getHeaderText()}
          </span>
          <button
            onClick={goToNext}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors border border-gray-200 text-gray-600 cursor-pointer"
            title="Next"
          >
            <BiChevronRight size={18} />
          </button>
        </div>

        {/* Right: View toggle buttons */}
        <div className="flex shrink-0 rounded-md overflow-hidden border border-gray-200 bg-white">
          {viewNamesGroup.map((item, index) => (
            <button
              key={index}
              onClick={() => toolbar.onView(item.view)}
              className={`flex items-center justify-center px-2.5 sm:px-3 py-1 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                toolbar.view === item.view
                  ? "bg-subMain text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              } ${index === 0 ? "rounded-l-md" : ""} ${
                index === viewNamesGroup.length - 1 ? "rounded-r-md" : ""
              }`}
            >
              {item.view === "month" ? (
                <HiOutlineViewGrid className="mr-1 inline-block" size={13} />
              ) : (
                <HiOutlineCalendarDays
                  className="mr-1 inline-block"
                  size={13}
                />
              )}
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
