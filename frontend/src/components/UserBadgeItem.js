import React from "react";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <div className="w-auto px-3 py-1 pr-0 mr-2 text-base text-white bg-purple-600 rounded-lg">
      <span>{user.name}</span>
      <button
        className="px-2 py-1 text-sm rounded hover:text-red-600"
        type="button"
        onClick={handleFunction}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

export default UserBadgeItem;
