import { INews } from "@/types/news";
import Image from "next/image";
import RelatedNews from "@/components/news/relatedNews";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const extractId = (slug: string) => {
    const match = slug.match(/(\d+)$/);
    return match ? match[0] : "";
  };
  const id = extractId(params.slug);
  const getNews = await fetch(`http://localhost:4000/news/${id}`);
  const newsContent: INews = await getNews.json();
  return {
    title: newsContent.title,
    description: newsContent.content.substring(0, 150),
  };
}

export default async function NewsContent({
  params,
}: {
  params: { slug: string };
}) {
  const extractId = (slug: string) => {
    const match = slug.match(/(\d+)$/);
    return match ? match[0] : "";
  };
  const id = await extractId(params.slug);
  const getNews = await fetch(`http://localhost:4000/news/${id}`);
  const newsContent: INews = await getNews.json();
  const formattedContent = newsContent.content.replace(/\n/g, "<br />");
  const date = newsContent.created_at ? new Date(newsContent.created_at) : null;
  const formattedDate = date ? date.toLocaleDateString("vi-VN") : "";

  return (
    <div className="relative top-16 w-[70%] m-auto text-black">
      <div>
        <h1 className="text-xl font-bold py-5">{newsContent.title}</h1>
        <p className="text-sm">Ngày đăng: {formattedDate} </p>
        <div className="w-[100%] m-auto my-5">
          <Image
            src={newsContent?.image || "/images/logo.png"}
            alt={newsContent?.title || "ảnh mặc định"}
            layout="responsive"
            width={500}
            height={500}
          />
        </div>
        <div
          className=""
          dangerouslySetInnerHTML={{ __html: formattedContent || "" }}
        />
      </div>
      <div>
        <RelatedNews />
      </div>
    </div>
  );
}
