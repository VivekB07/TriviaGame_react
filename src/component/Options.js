import React, { useState } from "react";

const Options = ({ options, handleOptionSelect }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (option) => {
    setSelectedOption(option);
    handleOptionSelect(option);
  };
  
  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleSelect(option)}
          className={selectedOption === option ? "selected" : "optionView"}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
