import React, { useContext, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import Drawer from "../Drawer";
import { DrawerProvider, useDrawerContext } from "../../context/DrawerProvider";

const SideDrawer = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { isOpen, handleToggle } = useDrawerContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div>
      <div className="flex items-center justify-between w-full px-1 py-2 bg-white ">
        {isOpen ? (
          <Drawer />
        ) : (
          <button
            className="flex px-4 py-2 hover:bg-slate-400"
            onClick={handleToggle}
          >
            <div className="text-center">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>

            <p className="px-4">Search User</p>
          </button>
        )}

        <div className="fixed text-2xl left-1/2">
          <h1>Chat App</h1>
        </div>

        <div className="relative">
          <button
            className="px-4 py-2 rounded hover:bg-gray-300"
            onClick={toggleNotifications}
          >
            <i className="fa-solid fa-bell"></i>
          </button>
          {showNotifications && (
            <div className="absolute right-0 w-64 p-4 bg-white border rounded shadow-lg top-12">
              <ul>
                <li className="py-2 border-b">Notification 1</li>
                <li className="py-2 border-b">Notification 2</li>
                <li className="py-2">Notification 3</li>
              </ul>
            </div>
          )}

          <button
            className="px-4 py-2 rounded hover:bg-gray-300"
            onClick={toggleDropdown}
          >
            <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <span className="font-medium text-gray-600 dark:text-gray-300">
                TA
              </span>
            </div>

            <strong className="px-2">
              <i className="text-sm fa fa-chevron-down"></i>
            </strong>
          </button>

          {showDropdown && (
            <div className="absolute right-0 w-48 mt-2 bg-white border rounded-md shadow-lg">
              <div className="py-2">
                <ProfileModal>
                  <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    View Account
                  </button>
                </ProfileModal>
                <button
                  href="#logout"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
