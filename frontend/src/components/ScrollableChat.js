import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import Avatar from "react-avatar";
import { isLastMessage, isSameSender } from "../config/ChatLogics";
import { ChatState } from "../context/ChatProvider";
import CustomToolTip from "./CustomToolTip";

const CustomAvatar = ({ name, src }) => (
  <div className="relative ">
    <img
      src="/assets/images/user.png"
      alt="User Avatar"
      className="self-end w-8 h-8 rounded-full"
    ></img>
  </div>
);

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed className="flex flex-col w-full h-full p-1 overflow-x-hidden overflow-y-auto">
      {messages &&
        messages.map((m, i) => (
          <div
            className={`flex items-center w-full ${
              m.sender._id === user._id ? "justify-end" : ""
            }`}
            key={m._id}
          >
            {isSameSender(messages, m, i, user._id) ||
            isLastMessage(messages, i, user._id) ? (
              <CustomToolTip label={m.sender.name}>
                <CustomAvatar name={m.sender.name} src={m.sender.pic} />
              </CustomToolTip>
            ) : (
              <div className="ml-8"></div>
            )}
            <span
              className={`${
                m.sender._id === user._id ? "bg-blue-400" : "bg-green-500"
              } px-3 py-2 w-fit rounded-3xl mb-1 flex ml-1`}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
