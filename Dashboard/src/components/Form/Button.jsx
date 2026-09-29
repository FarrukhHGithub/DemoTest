import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

export function Button({ label, onClick, loading, Icon }) {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-2 hover:opacity-90 transitions bg-subMain text-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-lg shadow-xs cursor-pointer`}
    >
      {loading ? (
        <BiLoaderCircle className="animate-spin text-white text-xl" />
      ) : (
        <>
          {label}
          {Icon && <Icon className="text-white text-lg" />}
        </>
      )}
    </button>
  );
}
