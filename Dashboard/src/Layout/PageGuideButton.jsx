import React from "react";
import { TbCompass } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { useDriverTour } from "../hooks/useDriverTour";

export function PageGuideButton() {
  const location = useLocation();
  const { resetTour } = useDriverTour();

  const handleStartTour = () => {
    const pathname = location.pathname;
    let tourId = "dashboard";
    
    if (pathname === "/" || pathname === "/dashboard") {
      tourId = "dashboard";
    } else if (pathname.startsWith("/patients")) {
      if (pathname.includes("/visiting") || pathname.includes("/preview") || pathname.includes("/profile")) {
        tourId = "records";
      } else {
        tourId = "patients";
      }
    } else if (pathname.startsWith("/appointments")) {
      tourId = "appointments";
    } else if (pathname.startsWith("/invoices")) {
      tourId = "invoices";
    } else if (pathname.startsWith("/services")) {
      tourId = "services";
    } else if (pathname.startsWith("/medicine")) {
      tourId = "medicine";
    } else if (pathname.startsWith("/campaigns")) {
      tourId = "campaigns";
    } else if (pathname.startsWith("/receptions")) {
      tourId = "receptions";
    } else if (pathname.startsWith("/settings")) {
      tourId = "settings";
    } else if (pathname.startsWith("/users")) {
      tourId = "users";
    } else if (pathname.startsWith("/payments")) {
      tourId = "payments";
    } else if (pathname.startsWith("/archived")) {
      tourId = "archived";
    }

    resetTour(tourId);
  };

  return (
    <button
      onClick={handleStartTour}
      className="flex items-center gap-2 px-3 py-1.5 bg-subMain bg-opacity-10 hover:bg-opacity-20 text-subMain border border-subMain border-opacity-20 rounded-lg text-sm font-semibold transition duration-200 shadow-sm"
      title="Learn about this component"
    >
      <TbCompass className="text-xl animate-pulse text-subMain" />
      <span className="hidden sm:inline">Page Guide</span>
    </button>
  );
}
