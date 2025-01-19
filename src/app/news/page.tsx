import { INews } from "@/types/news";
import React from "react";
import Image from "next/image";
export default async function NewsPage() {
  const getNews = await fetch("http://localhost:4000/news");
  const newsData: INews[] = await getNews.json();
  return (
    <div className="relative top-20 w-[70%] m-auto text-black">
      <div className="flex  justify-center items-center gap-5">
        <h2 className="text-3xl text-[#00613d]">Tin tức nổi bật</h2>
        <div className="h-[2px] mt-1 w-full flex-1 bg-[#00613d]"></div>
      </div>
      <div>
        <div className="flex">
          <div className="w-full">
            <Image
              className="rounded-xl"
              src={newsData[0].image || ""}
              alt={newsData[0].title}
              width={100}
              height={100}
              layout="responsive"
            />
            <h2>{newsData[0].title}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
