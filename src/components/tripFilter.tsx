"use client";

import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { ITrips } from "@/types/trips";
import { BsCalendarRange } from "react-icons/bs";
import { useTrips } from "@/context/tripsContext";

interface ITripFilterProps {
  newTrips: ITrips[];
  setNewTrips: Dispatch<SetStateAction<ITrips[]>>;
}

const TripFilter: React.FC<ITripFilterProps> = ({ setNewTrips, newTrips }) => {
  const [activeArrange, setActiveArrange] = useState<string>("Mặc định");
  const [activeVehicleType, SetActiveVehicleType] = useState<string>("Tất cả");
  const { tripsData } = useTrips();
  const [originalTrips, setOriginalTrips] = useState<ITrips[]>([]);

  useEffect(() => {
    if (tripsData) {
      setOriginalTrips(tripsData);
      setNewTrips(tripsData);
    }
  }, [tripsData, setNewTrips]);

  const arrange = ["Mặc định", "Giá tăng dần", "Giá giảm dần"];
  const vehicleType = ["Tất cả", "Ghế", "Giường", "Limousine"];

  const handleActiveArrange = (item: string) => {
    if (!newTrips || !originalTrips) {
      alert("Không có chuyến xe để tìm kiếm");
      return;
    }

    switch (item) {
      case "Giá giảm dần":
        setNewTrips([...newTrips].sort((a, b) => b.price - a.price));
        break;
      case "Giá tăng dần":
        setNewTrips([...newTrips].sort((a, b) => a.price - b.price));
        break;
      case "Mặc định":
        setNewTrips(originalTrips);
        break;
      default:
        console.log("Unknown sort type");
    }

    setActiveArrange(item);
  };

  const handleActiveVehicleType = (item: string) => {
    SetActiveVehicleType(item);

    if (!originalTrips) {
      alert("Không có chuyến xe để tìm kiếm");
      return;
    }

    if (item === "Tất cả") {
      setNewTrips(originalTrips);
      return;
    }

    switch (item) {
      case "Giường":
        setNewTrips(originalTrips.filter((trip) => trip.bus_type === "Giường"));
        break;
      case "Ghế":
        setNewTrips(originalTrips.filter((trip) => trip.bus_type === "Ghế"));
        break;
      case "Limousine":
        setNewTrips(
          originalTrips.filter((trip) => trip.bus_type === "Limousine")
        );
        break;
      default:
        console.log("Unknown vehicle type");
    }
  };

  return (
    <div className="flex flex-col sticky top-16 bg-white shadow-custom p-3 w-full rounded-xl ">
      <div className="border-b-[1px] border-black">
        <h3 className="text-lg font-bold">Sắp xếp</h3>
        <ul className="flex flex-col py-2">
          {arrange.map((item, index) => (
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
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-bold my-2">Loại xe</h3>
        <ul className="flex gap-3 ">
          {vehicleType.map((item, index) => (
            <li
              className={`flex p-1 border-[1px] cursor-pointer ${
                activeVehicleType === item
                  ? "border-orange-600"
                  : "border-[#b8b7b7]"
              } rounded-lg`}
              key={index}
              onClick={() => handleActiveVehicleType(item)}
            >
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TripFilter;
