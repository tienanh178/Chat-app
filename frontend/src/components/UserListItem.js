import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <button
      href={`#${user?._id}`}
      onClick={handleFunction}
      className="w-full flex px-2 py-[6px] mt-2 bg-gray-400 border-2 rounded-lg focus:bg-green-500 items-center"
      type="button"
    >
      <img
        src="/assets/images/user.png"
        alt="User Avatar"
        className="w-10 h-10 rounded-full"
      ></img>
      <div className="ml-2 text-sm font-base">
        <h3 className="">{user?.name} </h3>
        <p className="text-xs font-semibold ">Email: {user?.email}</p>
      </div>
    </button>
  );
};

export default UserListItem;
