import React from "react";
import "./utils.css"

const BackButton = () => {
  const handleClick = () => {
    console.log("Navigating back");
  };

  return (
    <div className="back-button-container" onClick={handleClick}>
      <div className="flex justify-center items-center w-7 h-7 border-2 border-white rounded-full">
        <span className="text-white text-m">&lt;</span>
      </div>
      <span className="backButton">PEOPLE</span>
    </div>
  );
};

export default BackButton;