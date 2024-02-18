import React, { useState } from "react";
import Question from "./Questions";
import Options from "./Options";
import QuestionsResult from "./QuestionsResult";

const Quiz = ({ questions, onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [error, setError] = useState("");

  const handleOptionSelect = (option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestionIndex] = option;
    setSelectedOptions(updatedOptions);
    setError("");
  };

  const handleNext = () => {
    const selectedOption = selectedOptions[currentQuestionIndex];

    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const isCorrect = selectedOption === correctAnswer;

    setIsCorrect(isCorrect);
    setIsAnswered(true);

    if (currentQuestionIndex === questions.length - 1) {
      const correctAnswersCount = questions.reduce((count, q, index) => {
        const isCurrentCorrect = q.correctAnswer === selectedOptions[index];
        return count + (isCurrentCorrect ? 1 : 0);
      }, 0);
      onQuizComplete(correctAnswersCount);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false);
      setSelectedOptions([...selectedOptions, ""]);
      setIsCorrect(false);
      setError("");
    }
  };

  const handleSubmit = () => {
    const selectedOption = selectedOptions[currentQuestionIndex];
    if ((selectedOption === undefined || selectedOption === "")) {
      setError("Please select an option before submitting.");
      return;
    }

    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const isCorrect = selectedOption === correctAnswer;
    setIsCorrect(isCorrect);
    setIsAnswered(true);
  };

  return (
    <>
      <Question
        question={questions[currentQuestionIndex].question}
        number={currentQuestionIndex + 1}
      />
      {!isAnswered && (
        <Options
          options={questions[currentQuestionIndex].options}
          handleOptionSelect={handleOptionSelect}
        />
      )}
      {isAnswered && (
        <QuestionsResult
          isCorrect={isCorrect}
          correctAnswer={questions[currentQuestionIndex].correctAnswer}
        />
      )}
      <div style={{ color: "red" }}>{error}</div>
      <button className="view" onClick={isAnswered ? handleNext : handleSubmit}>
        {isAnswered ? "Next" : "Submit"}
      </button>
    </>
  );
};
export default Quiz;
