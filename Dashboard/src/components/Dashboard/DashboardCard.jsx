import React from "react";
import { BsArrowUpRight, BsArrowDownRight } from "react-icons/bs";

export function DashboardCard({ card }) {
  const Icon = card.icon;
  return (
    <div
      key={card.id}
      className="bg-white rounded-xl border border-border p-4 sm:p-5 hover:shadow-md hover:border-blue-200 transition-all duration-300 group"
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            {card.title}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-main mt-0.5">
            {card.id === 4 ? "$" : ""}
            {card.value}
            {card.id !== 4 ? "+" : ""}
          </h3>
        </div>
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-lg bg-opacity-10 ${card.color[0]} ${card.color[1]} group-hover:scale-105 transition-transform duration-300`}
        >
          <Icon className="text-lg" />
        </div>
      </div>

      {/* Trend Indicator */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
        <span
          className={`inline-flex items-center gap-1 py-0.5 px-2 rounded-full text-[11px] font-semibold ${
            card.percent >= 50
              ? "bg-emerald-50 text-emerald-600"
              : "bg-amber-50 text-amber-600"
          }`}
        >
          {card.percent >= 50 ? (
            <BsArrowUpRight className="text-[10px]" />
          ) : (
            <BsArrowDownRight className="text-[10px]" />
          )}
          {card.percent}%
        </span>
        <span className="text-[11px] text-gray-400 font-medium">vs last month</span>
      </div>
    </div>
  );
}
