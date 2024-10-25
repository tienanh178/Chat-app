import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Toaster, toast } from "sonner";
import axios from "axios";
import UserListItem from "../UserListItem";
import Loader from "../Loader";
import UserBadgeItem from "../UserBadgeItem";

const GroupChatModal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user, chats, setChats } = ChatState();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      setSearchResult([]);
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

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast.warning("Please enter name of the group or add members to group!");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      setChats([data, ...chats]);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast.warning("User is already added to the group!");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  return (
    <div>
      <span onClick={toggleModal}>{children}</span>
      <Toaster richColors closeButton />
      {isOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 "
        >
          <div className="relative p-6 pt-3 bg-white rounded-lg shadow-lg w-[500px] h-auto ">
            <h1 className="flex justify-center mb-8 text-3xl">
              {" "}
              Create new group chat
            </h1>

            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                placeholder="Chat name"
                className="w-full px-4 py-2 mb-4 border-2 rounded-md"
                onChange={(e) => setGroupChatName(e.target.value)}
              ></input>
              <input
                type="text"
                placeholder="Add user eg: User1, User2, etc..."
                className="w-full px-4 py-2 mt-4 mb-4 border-2 rounded-md"
                onChange={(e) => handleSearch(e.target.value)}
              ></input>
              <div className="flex">
                {selectedUsers?.map((user) => (
                  <UserBadgeItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleDelete(user)}
                  />
                ))}
              </div>

              {isLoading ? (
                <Loader />
              ) : (
                searchResult
                  ?.slice(0, 4)
                  .map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleGroup(user)}
                    />
                  ))
              )}
              <button
                className="float-right px-3 py-1 mt-4 text-white rounded-lg bg-sky-700 hover:bg-sky-500"
                type="submit"
              >
                Create Chat
              </button>
            </form>
            <button
              className="absolute px-4 py-2 
                 text-xl rounded  top-[0%] right-[2%] hover:text-red-600"
              onClick={toggleModal}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupChatModal;
