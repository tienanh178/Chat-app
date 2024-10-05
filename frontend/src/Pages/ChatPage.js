import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatPage = () => {
  // const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    // const { data } = await axios.get("/api/v1/chats");
    // setChats(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div>
      {/* <h1>Chat Page</h1>
      {console.log(chats)}
      {chats.map((chat) => (
        <div key={chat._id}> {chat.chatName}</div>
      ))} */}
    </div>
  );
};

export default ChatPage;
