import React, { useState } from "react";

const ProfileModal = ({ children, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const handleClickOutside = (e) => {
    if (e.target.id === "modal-overlay") {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div onClick={toggleModal} className="mr-4 hover:text-gray-700">
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <button className="flex" onClick={onOpen}>
          <i className="fa-solid fa-eye"></i>
        </button>
      )}
      {isOpen && (
        <div
          id="modal-overlay"
          onClick={handleClickOutside}
          className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 "
        >
          <div className="relative p-6 pt-3 bg-white rounded-lg shadow-lg w-[500px] h-[400px]">
            <h1 className="flex justify-center mb-8 text-5xl"> {user?.name}</h1>

            <img
              src="/assets/images/user.png"
              alt="User Avatar"
              className="mx-auto rounded-full h-36 w-36"
            />

            <h2 className="flex justify-center mt-6 text-3xl font-light">
              Email: {user?.email}
            </h2>

            <button
              className="absolute px-4 py-2 
                 text-xl rounded  top-[0%] right-[2%] hover:text-red-600"
              onClick={toggleModal}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="relative ">
              <button className="items-center float-right px-3 py-1 mt-5 mr-6 text-base text-white rounded-lg bg-sky-700 hover:bg-sky-500">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileModal;
