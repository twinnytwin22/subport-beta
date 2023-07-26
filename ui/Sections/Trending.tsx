'use client'
import React, { useState } from "react";

type TabData = {
  today: { id: number; title: string }[];
  thisWeek: { id: number; title: string }[];
  thisMonth: { id: number; title: string }[];
};

function Trending() {
  const [activeTab, setActiveTab] = useState<keyof TabData>("today");

  const handleTabClick = (tab: keyof TabData) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    const tabData: TabData = {
      today: [
        { id: 1, title: "Today Trend 1" },
        { id: 2, title: "Today Trend 2" },
        { id: 3, title: "Today Trend 3" },
      ],
      thisWeek: [
        { id: 4, title: "This Week Trend 1" },
        { id: 5, title: "This Week Trend 2" },
        { id: 6, title: "This Week Trend 3" },
      ],
      thisMonth: [
        { id: 7, title: "This Month Trend 1" },
        { id: 8, title: "This Month Trend 2" },
        { id: 9, title: "This Month Trend 3" },
      ],
    };

    const activeTabData = tabData[activeTab];

    return activeTabData.map((item) => (
      <div key={item.id} className="bg-white rounded-md p-4 shadow">
        <h3 className="text-lg font-medium text-black">{item.title}</h3>
        <p className="text-gray-500">Some description here</p>
      </div>
    ));
  };

  return (
    <div className="mx-auto w-full mt-2">
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-8">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button
              onClick={() => handleTabClick("today")}
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${activeTab === "today"
                ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
            >
              Today
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => handleTabClick("thisWeek")}
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg  ${activeTab === "thisWeek"
                ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
            >
              This Week
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => handleTabClick("thisMonth")}
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${activeTab === "thisMonth"
                ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
            >
              This Month
            </button>
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default Trending;
