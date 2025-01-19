"use client";

import { FaDotCircle } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { ITrips } from "@/types/trips";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useUser } from "@/context/authContext";
interface TripsItemProps {
  tripItem: ITrips;
}

const TripItem: React.FC<TripsItemProps> = ({ tripItem }) => {
  const { user } = useUser();
  const router = useRouter();
  const handleBookTrip = () => {
    if (user) {
      router.push(`/trips/${tripItem.id}`);
    } else {
      alert("Vui lòng đăng nhập để đặt chuyến xe");
      router.push("/auth");
    }
  };

  const emptySeats = useMemo(() => {
    return tripItem.seats.filter((item) => item.status === "available");
  }, [tripItem.seats]);

  const formatTime = (time: string) => {
    return time ? time.slice(0, -3) : "Không có thông tin";
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  return (
    <div className="border-2 border-orange-300 rounded-xl shadow-lg p-4 w-full max-w-4xl mx-auto bg-white">
      <div className="flex gap-10 justify-between items-center">
        {/* Thông tin thời gian và bến */}
        <div className="flex flex-col flex-1 ">
          {/* Giờ khởi hành */}
          <div className="flex">
            <div className="text-black text-2xl font-bold">
              {formatTime(tripItem.start_time)}
            </div>
            <div className="flex flex-1 justify-center items-center">
              <FaDotCircle className="m-3" />

              <div className=" flex-1 h-[1px] w-6 bg-gray-300 rounded-full"></div>
              <div className="text-sm text-center text-gray-500">
                {tripItem.travel_time} <br />
                (Asian/Ho Chi Minh)
              </div>

              <div className=" flex-1 h-[1px] w-6 bg-gray-300 rounded-full"></div>
              <FaMapMarkerAlt className="m-3" />
            </div>
            {/* Giờ đến nơi */}
            <div className="text-black text-2xl font-bold">
              {formatTime(tripItem.arrival_time)}
            </div>
          </div>
          {/* Tên bến */}
          <div className="flex justify-between text-gray-700 ">
            <div>{tripItem.from_location}</div>
            <div>{tripItem.to_location}</div>
          </div>
        </div>

        {/* Thông tin ghế trống và giá */}
        <div className="text-right">
          <div className="text-sm text-gray-500">
            {tripItem.bus_type} &bull;{" "}
            <span className="text-green-500">
              {emptySeats.length > 0
                ? `${emptySeats.length} chỗ trống`
                : "Hết ghế"}
            </span>
          </div>
          <div className="text-orange-500 text-xl font-bold">
            {formatCurrency(tripItem.price)}
          </div>
        </div>
      </div>

      {/* Nút chọn chuyến */}
      <div className="mt-6 flex justify-between">
        <div className="flex gap-3  mt-4 text-sm text-gray-600">
          <button className="hover:text-orange-500">Chọn ghế</button>
          <button className="hover:text-orange-500">Lịch trình</button>
          <button className="hover:text-orange-500">Trung chuyển</button>
          <button className="hover:text-orange-500">Chính sách</button>
        </div>
        <button
          onClick={handleBookTrip}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Chọn chuyến
        </button>
      </div>
    </div>
  );
};

export default TripItem;
