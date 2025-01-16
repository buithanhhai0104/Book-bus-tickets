import { ITrips } from "@/types/trips";
import Image from "next/image";
import Link from "next/link";
import { FaDotCircle, FaMapMarkerAlt } from "react-icons/fa";

interface IPopularProps {
  tripsData: ITrips[];
}

const Popular: React.FC<IPopularProps> = ({ tripsData }) => {
  // Nhóm các tuyến xe phổ biến vào một mảng
  const popularItems = [
    { title: "Hồ Chí Minh", location: "Hồ Chí Minh" },
    { title: "Đà Lạt", location: "Đà Lạt" },
    { title: "Đà Nẵng", location: "Đà Nẵng" },
  ];

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl text-center text-[#00613D] font-bold">
        TUYẾN PHỔ BIẾN
      </h1>
      <p className="text-center text-[#00613D]">
        Được khách hàng tin tưởng và lựa chọn
      </p>
      <div className="flex gap-8">
        {popularItems.map((item, index) => {
          // Lọc các chuyến đi theo địa điểm
          const filteredTrips = tripsData.filter(
            (trip) => trip.from_location === item.location
          );
          return (
            <Link
              href="/"
              className="bg-white rounded-xl mt-5 shadow-custom"
              key={item.title}
            >
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  className="shadow-custom rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-110"
                  width={360}
                  height={140}
                  src={`/images/popular-image${index + 1}.png`}
                  alt={item.title}
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute top-[50%] left-4">
                  <p>Tuyến xe từ</p>
                  <h4 className="text-2xl font-bold">{item.title}</h4>
                </div>
              </div>
              {filteredTrips.slice(0, 3).map((data, dataIndex) => (
                <div
                  className="flex flex-col p-4 text-black border-b-2"
                  key={dataIndex}
                >
                  <div className="flex flex-col">
                    <span className="text-[#00613D] font-semibold">
                      <div className="flex flex-1 justify-center items-center">
                        {data.start_time.slice(0, -3)}
                        <FaDotCircle className="m-3" />
                        <div className="flex-1 h-[1px] w-6 bg-gray-300 rounded-full" />
                        <div className="text-[12px] text-center text-gray-500">
                          {data.travel_time} <br />
                          (Asian/Ho Chi Minh)
                        </div>
                        <div className="flex-1 h-[1px] w-6 bg-gray-300 rounded-full" />
                        <FaMapMarkerAlt className="m-3" />
                        {data.arrival_time.slice(0, -3)}
                      </div>
                    </span>
                    <div className="flex justify-between">
                      <p className="text-sm">{data.from_location}</p>
                      <p className="text-sm">{data.to_location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
