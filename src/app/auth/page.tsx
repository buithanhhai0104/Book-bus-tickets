"use client";
import Login from "@/components/login";
import Register from "@/components/register";
import { useState } from "react";

const Auth: React.FC = () => {
  const [form, setform] = useState<string>("Register");
  const handleSetForm = () => {
    if (form === "Login") {
      setform("Register");
    } else {
      setform("Login");
    }
  };
  return (
    <div className=" flex justify-center items-center bg-login-background h-[100vh]">
      <div className=" w-96 flex flex-col justify-center items-center shadow-md">
        {form === "Register" ? <Login /> : <Register />}
        <button className="text-blue-400 underline" onClick={handleSetForm}>
          {form}
        </button>
      </div>
    </div>
  );
};

export default Auth;
