import axios from "axios";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const hideAndShow = (e) => {
    e.preventDefault();
    setIsShow(!isShow);
  };

  const submitHandler = async () => {
    console.log(email, password);
    setIsLoading(true);
    if (!email || !password) {
      toast.error("Please fill all the fields!");
      setIsLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      console.log(data);
      toast.success("Login successful!");
      localStorage.setItem("userInfo", JSON.stringify(data));

      setIsLoading(false);
      navigate("/chats");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Toaster />
      <div className="flex flex-col gap-2 mt-4">
        <label>
          <strong>Email</strong>
        </label>
        <input
          type="text"
          placeholder="Enter Your Email"
          className="px-2 py-1 border-2 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label>
          <strong>Password</strong>
        </label>

        <input
          type={isShow ? "text" : "password"}
          placeholder="Enter Your Password"
          className="px-2 py-1 border-2 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="relative">
          <button
            className="absolute text-sm -top-9 right-4"
            onClick={hideAndShow}
          >
            {isShow ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div>
        <button
          className="w-full py-2 mt-4 text-white bg-sky-600 rounded-xl"
          onClick={submitHandler}
        >
          {" "}
          Login
        </button>
      </div>
      <div>
        <button className="w-full py-2 mt-4 text-white bg-red-600 rounded-xl hover:bg-red-800">
          {" "}
          Get Guest User Credentials
        </button>
      </div>
    </form>
  );
};

export default Login;
