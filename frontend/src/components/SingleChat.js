import React from "react";
import { ChatState } from "../context/ChatProvider";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  return (
    <div>
      {selectedChat ? (
        <div className="flex flex-col h-[625px]">
          <div className="flex text-2xl font-normal">
            <div className="flex items-center justify-between w-full pl-1 mt-2">
              <button
                className={` px-3 py-2 text-sm rounded-lg hover:bg-slate-500 bg-slate-300 md:hidden`}
                onClick={() => setSelectedChat("")}
              >
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
              </button>
              {!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  {
                    <UpdateGroupChatModal
                      fetchAgain={fetchAgain}
                      setFetchAgain={setFetchAgain}
                    />
                  }
                </>
              )}
            </div>
          </div>
          <div className="w-full h-full px-2 py-2 mt-2 overflow-hidden rounded-lg bg-slate-300">
            <span>Message here</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full text-2xl font-extralight">
          Click on a user to start chatting
        </div>
      )}
    </div>
  );
};

export default SingleChat;
