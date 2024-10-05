import React, { useState } from "react";
import Signup from "../components/Authentication/Signup";
import Login from "../components/Authentication/Login";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto">
      <div className="flex justify-center p-3 w-[550px] bg-white  my-10 rounded-lg border border-gray-300">
        <h1 className="font-sans text-4xl">Talk-A-Tive</h1>
      </div>
      <div className="bg-white w-[550px] p-6  rounded-lg border border-gray-300">
        <div className="flex justify-around mb-4">
          <button
            className={`w-full py-2 text-center text-slate-800 rounded-2xl  ${
              activeTab === "login" ? "bg-cyan-200" : "bg-white"
            }`}
            id="login-tab"
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`w-full py-2 ml-2 text-center text-slate-800 rounded-2xl ${
              activeTab === "signup" ? "bg-cyan-200" : "bg-white"
            }`}
            id="signup-tab"
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>
        {activeTab === "login" ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default HomePage;
