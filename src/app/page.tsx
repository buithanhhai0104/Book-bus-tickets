import Popular from "@/components/popular";
import SearchBox from "@/components/searchBox";
import { ITrips } from "@/types/trips";

export default async function Home() {
  const res = await fetch("http://localhost:4000/api/trips");
  const tripsData: ITrips[] = await res.json();
  console.log(tripsData);
  return (
    <div className="h-[1000px]">
      <div className="w-full bg-home-image h-[600px] bg-cover"></div>
      <div className="mt-[-100px] w-[80%] m-auto ">
        <SearchBox />
      </div>
      <div className="flex pt-14 justify-center ">
        <Popular tripsData={tripsData} />
      </div>
      <div className="flex pt-14 justify-center ">
        <Popular tripsData={tripsData} />
      </div>
    </div>
  );
}
