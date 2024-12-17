"use client";

import { checkTickets } from "@/lib/bookTicketsService";
import { IBookTicket } from "@/types/bookTickets";
import { useState } from "react";

export default function CheckTickets() {
  const [ticketId, setTicketId] = useState<string>("");
  const [ticketData, setTicketData] = useState<IBookTicket | null>(null);
  const handleCheckTickets = async () => {
    try {
      const res = await checkTickets(
        `http://localhost:4000/tickets/${ticketId}`
      );
      setTicketData(res);
    } catch (err) {
      console.log("Lỗi tìm kiếm vé", err);
    }
  };
  console.log(ticketData);
  return ticketData ? (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 py-10">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-orange-600 text-center mb-6">
          Chi tiết vé
        </h1>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Mã số vé:</span>
            <span className="text-gray-900">{ticketData.ticket_id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Mã số xe:</span>
            <span className="text-gray-900">{ticketData.trip_id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Tên khách hàng:</span>
            <span className="text-gray-900">{ticketData.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Mã số ghế:</span>
            <span className="text-gray-900">{ticketData.seat_number}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="text-gray-900">{ticketData.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">
              Thời gian đặt vé:
            </span>
            <span className="text-gray-900">{ticketData.booking_time}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Số điện thoại:</span>
            <span className="text-gray-900">{ticketData.phone}</span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-orange-600 mb-6 text-center">
          Tra cứu vé xe
        </h1>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="ticketCode"
              className="block text-sm font-medium text-gray-700"
            >
              Nhập mã vé
            </label>
            <input
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              id="ticketCode"
              type="text"
              placeholder="Mã số vé"
              className="mt-1 block w-full px-4 py-2 text-gray-900 border border-orange-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
            />
          </div>
          <button
            onClick={handleCheckTickets}
            type="button"
            className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
          >
            Tra cứu
          </button>
        </form>
      </div>
    </div>
  );
}
