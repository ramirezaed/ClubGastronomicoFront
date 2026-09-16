"use client";

import { ReactNode } from "react";

interface TabItem {
  id: string;
  label: string;
  icon: ReactNode;
}

interface ReportsTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  children?: ReactNode;
  className?: string; // ← Asegúrate de que exista
}

export function ReportsTabs({ tabs, activeTab, onTabChange, children, className = "" }: ReportsTabsProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col ${className}`}
    >
      <div className="border-b border-slate-200 flex-shrink-0">
        <div className="flex flex-wrap sm:flex-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-center sm:justify-start gap-2">
                {tab.icon}
                {tab.label}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4 sm:p-6">{children}</div>
    </div>
  );
}
