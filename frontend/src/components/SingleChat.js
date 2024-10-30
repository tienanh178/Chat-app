/* eslint no-use-before-define: 0 */
import React, { useEffect, useRef, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import Loader from "./Loader";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import io from "socket.io-client";
import animationData from "../animations/typing.json";

const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();

  const endOfMessagesRef = useRef(null);

  // Hàm để tự động cuộn đến phần tử cuối cùng
  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Gọi scrollToBottom mỗi khi mảng `messages` thay đổi
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  const sendMessage = async (event) => {
    event.preventDefault();
    socket.emit("stop typing", selectedChat._id);

    if (newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data);

        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff > timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <div className="h-full pb-1">
      {selectedChat ? (
        <div className="flex flex-col h-full ">
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
                      fetchMessages={fetchMessages}
                    />
                  }
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full h-full px-2 py-2 mt-2 overflow-x-hidden overflow-y-auto rounded-lg bg-slate-300">
            <div className="flex flex-col justify-end flex-1 w-full ">
              {loading ? (
                <Loader size="120" loading={loading} />
              ) : (
                <div className="flex ">
                  <ScrollableChat messages={messages} />
                </div>
              )}
            </div>

            {isTyping ? (
              <div>
                <Lottie
                  options={defaultOptions}
                  width={70}
                  style={{ marginBottom: 15, marginLeft: 0 }}
                />
              </div>
            ) : (
              <></>
            )}
            <form onSubmit={sendMessage} className="flex justify-end">
              <input
                className="w-full px-2 py-1 text-base rounded-lg bg-slate-200"
                type="text"
                placeholder="Enter a messages ..."
                onChange={typingHandler}
                value={newMessage}
              ></input>
            </form>
            <div ref={endOfMessagesRef} />
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
