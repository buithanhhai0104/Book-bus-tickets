"use client";

import { IBookTicket } from "@/types/bookTickets";
import React from "react";
interface IBookingSuccessProps {
  bookTicketsData: IBookTicket[] | null;
  handleReturnBookingPage: () => void;
}
const BookingSuccess: React.FC<IBookingSuccessProps> = ({
  bookTicketsData,
  handleReturnBookingPage,
}) => {
  return (
    <div className="min-h-screen w-[60%] flex items-center justify-center">
      <div className="w-full overflow-auto bg-white shadow-custom rounded-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-600">
            Đặt Vé Thành Công!
          </h1>
          <p className="text-gray-600 mt-2">
            Dưới đây là thông tin các vé bạn đã đặt:
          </p>
        </div>

        {/* Danh sách vé */}
        <div className="flex flex-col gap-3">
          {bookTicketsData?.map((ticket, index) => {
            return (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg shadow-custom bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-black">
                    Mã vé: <b>{ticket.ticket_id}</b> (có thể dùng mã vế để tra
                    cứu vé trên hệ thống)
                  </span>
                </div>
                <div className="mt-2 text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Họ và tên:</span>{" "}
                    {ticket.name}
                  </p>
                  <p>
                    <span className="font-medium">Số điện thoại:</span>{" "}
                    {ticket.phone}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {ticket.email}
                  </p>
                  <p>
                    <span className="font-medium">Số ghế:</span>{" "}
                    {ticket.seat_number}
                  </p>
                  <p>
                    <span className="font-medium">Chuyến đi:</span>{" "}
                    {ticket.trip_id}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nút quay lại */}
        <div className="text-center mt-8">
          <button
            onClick={handleReturnBookingPage}
            className="px-6 py-3 bg-blue-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};
export default BookingSuccess;
