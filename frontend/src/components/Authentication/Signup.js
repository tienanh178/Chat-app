/* eslint-disable */
import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const hideAndShow = (e) => {
    e.preventDefault();
    setIsShow(!isShow);
  };
  const hideAndShowConfirm = (e) => {
    e.preventDefault();
    setIsShowConfirm(!isShowConfirm);
  };

  const postDetail = (pics) => {};

  const submitHandler = async () => {
    setIsLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please enter all required fields!");
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");

      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      console.log(data);

      toast.success("Registration successful!");
      localStorage.setItem("userInfo", JSON.stringify(data));

      setIsLoading(false);
      navigate("/chats");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Toaster richColors position="bottom-right" />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 mt-4">
          <label>
            <strong>Name</strong>
          </label>
          <input
            type="text"
            placeholder="Enter Your Name"
            className="px-2 py-1 border-2 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div className="flex flex-col gap-2 mt-4">
          <label>
            <strong>Confirm Password</strong>
          </label>

          <input
            type={isShowConfirm ? "text" : "password"}
            placeholder="Confirm your password"
            className="px-2 py-1 border-2 rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="relative">
            <button
              className="absolute text-sm -top-9 right-4"
              onClick={hideAndShowConfirm}
            >
              {isShowConfirm ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label>
            <strong>Upload your picture</strong>
          </label>
          <input type="file" className="px-2 py-1" accept="image/*" onClick />
        </div>
        <div>
          <button
            className="w-full py-2 mt-4 text-white bg-sky-600 rounded-xl hover:bg-sky-800"
            onClick={submitHandler}
          >
            {" "}
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
