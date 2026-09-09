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
}

export function ReportsTabs({ tabs, activeTab, onTabChange, children }: ReportsTabsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="border-b border-slate-200">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-2">
                {tab.icon}
                {tab.label}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
