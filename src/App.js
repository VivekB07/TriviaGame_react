import React, { useEffect, useState } from "react";
import "./App.css";
import Results from "./component/Results";
import Quiz from "./component/Quiz";

const App = () => {
  const [ques, setQues] = useState([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQues = async () => {
      setIsLoading(true);
      try {
        const url = "https://opentdb.com/api.php?amount=10";

        const response = await fetch(url);
        const data = await response.json();
        if (!data.results) {
          throw new Error("API data missing results");
        }
        const questionsData = data.results.map((quesData) => {
          const options = [
            ...quesData.incorrect_answers,
            quesData.correct_answer,
          ];
          return {
            question: quesData.question,
            options,
            correctAnswer: quesData.correct_answer,
          };
        });
        setQues(questionsData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQues();
  }, [setQues]);

  const handleQuizComplete = (count) => {
    setIsQuizComplete(true);
    setCorrectAnswers(count);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading questions...</p>
      ) : isQuizComplete ? (
        <Results
          totalQuestions={ques.length}
          correctQuestions={correctAnswers}
          incorrectQuestions={ques.length - correctAnswers}
        />
      ) : (
        <Quiz questions={ques} onQuizComplete={handleQuizComplete} />
      )}
    </div>
  );
};

export default App;
