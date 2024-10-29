import React from "react";

const CustomToolTip = ({ label, children }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute left-0 hidden px-2 py-1 mb-2 text-xs text-white transition-opacity duration-200 bg-gray-700 rounded-lg opacity-0 bottom-full w-max whitespace-nowrap group-hover:opacity-100">
        {label}
      </div>
    </div>
  );
};

export default CustomToolTip;
