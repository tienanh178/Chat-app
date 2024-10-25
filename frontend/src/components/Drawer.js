import React, { useState } from "react";
import { useDrawerContext } from "../context/DrawerProvider";
import { Toaster, toast } from "sonner";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import UserListItem from "./UserListItem";

function Drawer() {
  const { isOpen, onClose } = useDrawerContext();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { user, setSelectedChat, chats, setChats } = ChatState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search) {
      toast.warning("Please enter something to the search field!");
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const { data } = await axios.get(`/api/user/?search=${search}`, config);

      setSearchResult(data);
    } catch (error) {
      toast.error(error.name);
      console.log(error);
    }
  };

  const accessChat = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Toaster richColors position="top-left" />
      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-[300px]"
        } transition-transform duration-300 ease-in-out bg-white w-[300px]`}
      >
        <div className="p-6">
          <button
            className="fixed px-2 py-1 text-gray-400 font-bold rounded right-[5%] top-[5%] hover:bg-red-600 focus:border-blue-400 "
            onClick={onClose}
          >
            X
          </button>
          <h1 className="mb-4 text-2xl">Search Users</h1>
          <div className="mb-2 border-b-2 border-gray-300"></div>
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex px-4 py-2 border-2 rounded-lg focus:border-blue-400 focus:outline-none hover:border-blue-400"
              placeholder="Search by name or email"
            ></input>
            <button
              className="px-2 py-1 ml-2 font-semibold border-2 bg-slate-300 hover:bg-slate-400"
              type="submit"
            >
              Go
            </button>
          </form>
          {searchResult?.map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              handleFunction={() => accessChat(user._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Drawer;
