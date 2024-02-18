import React from "react";

const Results = ({ totalQuestions, correctQuestions, incorrectQuestions }) => {
  return (
    <div>
      <h1>Results</h1>
      <p>Total Questions Served: {totalQuestions}</p>
      <p>Total Correct Questions: {correctQuestions}</p>
      <p>Total Incorrect Questions: {incorrectQuestions}</p>
    </div>
  );
};

export default Results;
