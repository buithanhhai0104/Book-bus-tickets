"use client";
import SearchBox from "@/components/searchBox";
import TripFilter from "@/components/tripFilter";
import TripsItems from "@/components/tripsContent/tripsItems";
import { useTrips } from "@/context/tripsContext";
import { ITrips } from "@/types/trips";
import { useEffect, useState } from "react";

export default function Trips() {
  const { tripsData } = useTrips();

  const [newTrips, setNewTrips] = useState<ITrips[]>([]);

  useEffect(() => {
    if (Array.isArray(tripsData)) {
      setNewTrips(tripsData);
    } else {
      setNewTrips([]);
    }
  }, [tripsData]);

  console.log(newTrips);

  return (
    <div className="flex flex-col relative top-16 w-[75%] m-auto">
      <SearchBox />
      <div className="grid grid-cols-7 gap-7 text-black mt-12">
        <aside className="col-span-2 ">
          <TripFilter setNewTrips={setNewTrips} tripsData={newTrips} />
        </aside>
        <div className="col-span-5">
          <TripsItems newTrips={newTrips} />
        </div>
      </div>
    </div>
  );
}
