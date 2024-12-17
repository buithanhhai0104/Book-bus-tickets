"use client";
import { Dispatch, SetStateAction } from "react";
import { ITrips } from "@/types/trips";
import { useState } from "react";
import { BsCalendarRange } from "react-icons/bs";

interface ITripFilterProps {
  tripsData: ITrips[] | null;
  setNewTrips: Dispatch<SetStateAction<ITrips[]>>;
}
const TripFilter: React.FC<ITripFilterProps> = ({ setNewTrips, tripsData }) => {
  const [activeArrange, setActiveArrange] = useState<string>("Mặc định");
  const [activeVehicleType, SetActiveVehicleType] = useState<string>("Tất cả");
  const arrange = ["Mặc định", "Giá tăng dần", "Giá giảm dần"];

  const vehicleType = ["Tất cả", "Ghế", "Giường", "Limousine"];

  const handleActiveArrange = (item: string) => {
    switch (item) {
      case "Giá giảm dần":
        if (tripsData) {
          const priceIncreases = [...tripsData].sort(
            (a, b) => b.price - a.price
          );
          setNewTrips(priceIncreases);
        } else {
          alert("Không có chuyến xe để tìm kiếm");
        }
        break;
      case "Giá tăng dần":
        if (tripsData) {
          const priceIncreases = [...tripsData].sort(
            (a, b) => a.price - b.price
          );
          setNewTrips(priceIncreases);
        } else {
        }
        break;
      case "Mặc định":
        if (tripsData) {
          setNewTrips(tripsData);
        } else {
          alert("Không có chuyến đi");
        }
        break;
      default:
        console.log("Unknown ");
    }
    setActiveArrange(item);
  };

  const handleActiveVehicleType = (item: string) => {
    SetActiveVehicleType(item);
  };

  return (
    <div className="flex flex-col sticky top-16 bg-white shadow-custom p-3 w-full rounded-xl ">
      <div className="border-b-[1px] border-black">
        <h3 className="text-lg font-bold">Sắp xếp</h3>
        <ul className="flex flex-col py-2">
          {arrange.map((item, index) => {
            return (
              <li
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
                  activeArrange === item ? "text-orange-600" : ""
                }`}
                key={index}
                onClick={() => handleActiveArrange(item)}
              >
                <BsCalendarRange />
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-bold my-2">Loại xe</h3>
        <ul className="flex gap-3 ">
          {vehicleType.map((item, index) => {
            return (
              <li
                className={`flex p-1 border-[1px] cursor-pointer ${
                  activeVehicleType === item
                    ? "border-orange-600 text-orange-600"
                    : "border-[#b8b7b7] "
                } rounded-lg`}
                key={index}
                onClick={() => handleActiveVehicleType(item)}
              >
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TripFilter;
