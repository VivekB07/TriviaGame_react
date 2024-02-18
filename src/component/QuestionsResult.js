import React from "react";

const QuestionsResult = ({ isCorrect, correctAnswer }) => {
  return (
    <div className="result">
      {isCorrect ? "Correct!" : "Oops incorrect!"}
      {!isCorrect && <p>Correct answer: {correctAnswer}</p>}
    </div>
  );
};

export default QuestionsResult;
