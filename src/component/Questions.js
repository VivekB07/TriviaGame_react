import React from "react";

const Question = ({ question, number }) => {
  return (
    <>
      <h1>{`Question ${number}`}</h1>
      <div className="question">{question}</div>
    </>
  );
};

export default Question;
