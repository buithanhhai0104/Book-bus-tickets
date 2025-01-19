import NewNews from "@/components/news/newNews";
import Popular from "@/components/popular";
import SearchBox from "@/components/searchBox";
import { INews } from "@/types/news";
import { ITrips } from "@/types/trips";

import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Trang chủ",
  };
}

export default async function Home() {
  const getTrips = await fetch("http://localhost:4000/api/trips");
  const tripsData: ITrips[] = await getTrips.json();
  const getNews = await fetch("http://localhost:4000/news");
  const newsData: INews[] = await getNews.json();

  return (
    <>
      <div className="h-[1000px]">
        <div className="w-full bg-home-image h-[600px] bg-cover"></div>
        <div className="mt-[-100px] w-[80%] m-auto ">
          <SearchBox />
        </div>
        <div className="flex pt-14 justify-center ">
          <Popular tripsData={tripsData} />
        </div>
        <div className="flex pt-14 justify-center ">
          <NewNews newsData={newsData} />
        </div>
      </div>
    </>
  );
}
