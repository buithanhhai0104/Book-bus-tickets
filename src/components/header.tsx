"use client";

import { useUser } from "@/context/authContext";
import { getUser } from "@/lib/authService";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import { CiUser } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";
const Header: React.FC = () => {
  const navPage = [
    {
      title: "Trang chủ",
      to: "/",
    },
    {
      title: "Chuyến Đi",
      to: "/trips",
    },
    {
      title: "Tra cứu vé",
      to: "/check",
    },
    {
      title: "Tin tức",
      to: "/",
    },
    {
      title: "Liên hệ",
      to: "/",
    },
    {
      title: "Về chúng tôi",
      to: "/",
    },
  ];

  const { user, setUser } = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getUser("http://localhost:4000/userinfo");
        setUser(res.userdata);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className=" fixed z-10 w-full  bg-black bg-opacity-70 ">
      <div className="flex justify-between items-center w-[95%] m-auto">
        <Image width={60} height={60} src="/images/logo.png" alt="logo"></Image>
        <nav className="flex gap-10">
          {navPage.map((item, index) => (
            <Link
              className="flex flex-col p-3 font-medium group "
              key={index}
              href={item.to}
            >
              {item.title}
              <span className="h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {!user?.username ? (
          <Link
            className=" flex items-center gap-1 border-[1px]  p-2 rounded-xl hover:border-blue-500"
            href={"/auth"}
          >
            <CiUser className="text-xl" />
            Tài khoản
          </Link>
        ) : (
          <div className="text-4xl">
            <MdAccountCircle />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
