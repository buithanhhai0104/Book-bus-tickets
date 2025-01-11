"use client";
import AllTrips from "@/components/admin/allTrips";
import CreateTrip from "@/components/admin/createTrip";
import React, { useState } from "react";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";

const Manage = () => {
  const [showTripsList, setShowTripsList] = useState<boolean>(false);
  const [showTicketsList, setShowTicketsList] = useState<boolean>(false);
  const [activeComponent, setActiveComponent] = useState<string>("trips");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Thêm chuyến đi":
        return <CreateTrip />;
      case "Tất cả chuyến đi":
        return <AllTrips />;
      case "users":
        return <div className="text-gray-800 p-4">Danh sách người dùng</div>;
      case "tickets":
        return <div className="text-gray-800 p-4">Quản lý vé</div>;
      default:
        return;
    }
  };

  const tripManagementList = ["Tất cả chuyến đi", "Thêm chuyến đi"];
  const ticketManagementList = [
    "Tất cả vé",
    "Vé đã thanh toán",
    "Vé chưa thanh toán",
    "Vé đã hủy",
  ];

  return (
    <div className="flex relative top-[60px] w-full">
      {/* Sidebar */}
      <div className="w-[25%] sticky top-[60px] h-screen bg-white shadow-lg flex flex-col border-r border-gray-200">
        <div className="p-4 border-b border-gray-300 text-center text-xl font-semibold text-orange-600">
          Quản lý
        </div>
        <nav className="flex-grow overflow-y-auto">
          <ul className="flex flex-col">
            {/* Trips Management */}
            <li>
              <button
                onClick={() => setShowTripsList((prev) => !prev)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-lg font-medium text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors ${
                  showTripsList ? "bg-orange-50 text-orange-600" : ""
                }`}
              >
                <span>Quản lý chuyến đi</span>
                <span
                  className={`transition-transform ${
                    showTripsList ? "rotate-180" : ""
                  }`}
                >
                  {showTripsList ? <BsChevronDown /> : <BsChevronRight />}
                </span>
              </button>
              {showTripsList && (
                <div className="flex flex-col items-start p-3 gap-2 transition-all">
                  {tripManagementList.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveComponent(item)}
                      className={`text-base px-2 py-1 rounded hover:bg-orange-100 hover:text-orange-600 ${
                        activeComponent === item
                          ? "bg-orange-50 font-medium text-orange-600"
                          : "text-gray-700"
                      }`}
                    >
                      + {item}
                    </button>
                  ))}
                </div>
              )}
            </li>
            {/* Users Management */}
            <li>
              <button
                onClick={() => setActiveComponent("users")}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left text-lg font-medium text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors ${
                  activeComponent === "users"
                    ? "bg-orange-50 text-orange-600"
                    : ""
                }`}
              >
                <span>Quản lý người dùng</span>
              </button>
            </li>
            {/* Tickets Management */}
            <li>
              <button
                onClick={() => setShowTicketsList((prev) => !prev)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-lg font-medium text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors ${
                  showTicketsList ? "bg-orange-50 text-orange-600" : ""
                }`}
              >
                <span>Quản lý vé</span>
                <span
                  className={`transition-transform ${
                    showTicketsList ? "rotate-180" : ""
                  }`}
                >
                  {showTicketsList ? <BsChevronDown /> : <BsChevronRight />}
                </span>
              </button>
              {showTicketsList && (
                <div className="flex flex-col items-start p-3 gap-2 transition-all">
                  {ticketManagementList.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveComponent(item)}
                      className={`text-base px-2 py-1 rounded hover:bg-orange-100 hover:text-orange-600 ${
                        activeComponent === item
                          ? "bg-orange-50 font-medium text-orange-600"
                          : "text-gray-700"
                      }`}
                    >
                      + {item}
                    </button>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gray-50 p-6">
        {renderComponent() || (
          <div className="text-center text-gray-500">
            Chọn một mục để xem nội dung
          </div>
        )}
      </div>
    </div>
  );
};

export default Manage;
