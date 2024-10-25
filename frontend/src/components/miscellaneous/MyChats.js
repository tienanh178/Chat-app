import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { getSender } from "../../config/ChatLogics";
import GroupChatModal from "./GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast.error(error.name);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <div className="flex flex-col items-center p-2 pt-3 bg-white rounded-lg border-1 w-full md:w-[31%] h-full">
      <div className="flex items-center justify-between w-full px-3 pb-3">
        <h2 className="text-xl">My Chats</h2>
        <GroupChatModal>
          <button className="px-2 py-1 ml-6 border-2 hover:bg-slate-200">
            <span>New Group Chat </span>
            <i className="fa-solid fa-plus"></i>
          </button>
        </GroupChatModal>
      </div>

      <div className="flex flex-col w-full h-full mt-2 ">
        <div className="overflow-y-scroll ">
          {chats &&
            chats?.map((chat) => (
              <div
                className={`px-3 py-2 rounded-lg cursor-pointer mt-2 ${
                  selectedChat === chat ? "bg-green-500" : "bg-gray-400"
                } `}
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
              >
                <p>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyChats;
