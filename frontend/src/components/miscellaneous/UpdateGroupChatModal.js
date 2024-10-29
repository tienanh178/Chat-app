import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import UserBadgeItem from "../UserBadgeItem";
import axios from "axios";
import { toast, Toaster } from "sonner";
import Loader from "../Loader";
import UserListItem from "../UserListItem";

const UpdateGroupChatModal = ({
  children,
  fetchAgain,
  setFetchAgain,
  fetchMessages,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user, selectedChat, setSelectedChat } = ChatState();

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);

      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const { data } = await axios.put(
        "/api/chat/rename",
        { chatId: selectedChat._id, chatName: groupChatName },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast.warning("User is already in the group!");
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast.warning("Only admin can add people to the group!");
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };

      const { data } = await axios.put(
        "/api/chat/groupadd",
        { chatId: selectedChat._id, userId: user1._id },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast.warning("Only admin can remove people out of group!");
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };

      const { data } = await axios.put(
        "/api/chat/groupremove",
        { chatId: selectedChat._id, userId: user1._id },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      setSearchResult([]);
      return;
    }

    try {
      setIsLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      setSearchResult(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.name);
    }
  };

  return (
    <div className="mr-4 hover:text-gray-700">
      <Toaster richColors closeButton />
      {children ? (
        <span onClick={toggleModal}>{children}</span>
      ) : (
        <button className="flex" onClick={onOpen}>
          <i className="fa-solid fa-gear"></i>
        </button>
      )}
      {isOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 "
        >
          <div className="relative p-6 pt-3 bg-white rounded-lg shadow-lg w-[500px]">
            <h1 className="flex justify-center mb-8 text-3xl">
              {" "}
              {selectedChat.chatName}
            </h1>

            {/* <h2 className="flex mt-6 text-2xl font-light">Something</h2> */}
            <div className="flex">
              {selectedChat?.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </div>

            <div className="flex items-center content-center justify-center mt-4">
              <input
                placeholder="Group Name"
                type="text"
                className="w-full px-2 py-1 mr-3 text-base border-2 rounded-md"
                onChange={(e) => setGroupChatName(e.target.value)}
              ></input>
              <button
                className="h-full px-3 py-1 text-base text-white bg-green-500 border-2 rounded-lg hover:bg-green-700"
                onClick={handleRename}
              >
                Update
              </button>
            </div>

            <input
              type="text"
              placeholder="Add user eg: User1, User2, etc..."
              className="w-full px-2 py-1 mt-4 mb-4 text-base border-2 rounded-md"
              onChange={(e) => handleSearch(e.target.value)}
            ></input>

            {isLoading ? (
              <Loader />
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  />
                ))
            )}

            <button
              className="absolute px-4 py-2 
                 text-xl rounded  top-[0%] right-[2%] hover:text-red-600"
              onClick={toggleModal}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="relative">
              <button
                className="items-center float-right px-5 py-1 mt-5 text-base text-white bg-red-500 rounded-lg hover:bg-sky-700"
                onClick={() => handleRemove(user)}
              >
                Leave Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateGroupChatModal;
