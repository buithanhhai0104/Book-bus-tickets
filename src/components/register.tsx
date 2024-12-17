"use client";
import { apiRegister } from "@/lib/authService";
import Image from "next/image";
import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const registerData = {
      name: fullName,
      email: email,
      username: username,
      password: password,
    };
    console.log(registerData);
    try {
      const register = await apiRegister(
        "http://localhost:4000/auth/register",
        registerData
      );
      console.log(register);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full max-w-sm bg-white p-2 rounded-lg">
      <div className="w-full flex justify-center">
        <Image src="/images/logo.avif" alt="logo" width={121} height={44} />
      </div>
      <h2 className="text-2xl font-bold text-gray-800  mb-4 mt-4 text-center">
        Register
      </h2>

      <form className="w-[90%] m-auto">
        <div className="mb-4 ">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="username"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your Email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label
            htmlFor="full-name"
            className="block text-sm font-medium text-gray-700"
          >
            Full name
          </label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            id="full-name"
            name="full-name"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your full name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="acccount"
            className="block text-sm font-medium text-gray-700"
          >
            Account
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="account"
            name="account"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your account"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your password"
          />
        </div>

        {/* Register Button */}
        <div>
          <button
            onClick={handleRegister}
            type="submit"
            className="w-full bg-main-color text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
