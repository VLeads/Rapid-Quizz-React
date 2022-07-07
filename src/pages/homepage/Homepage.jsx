import React, { useEffect } from "react";
import "./Homepage.css";
import { QuizCategory } from "./component/QuizCategory";
import { quizData } from "data/quiz-data";
import { useQuiz } from "context/data-context";
import { actionConstants } from "context/actionConstants";

const Homepage = () => {
  const { quizDispatch } = useQuiz();

  const { RESET } = actionConstants;

  useEffect(() => {
    quizDispatch({
      type: RESET,
    });
  }, []);

  return (
    <main className="quiz-main-container">
      <h2>
        Unlocking knowledge at &nbsp;
        <span className="font-family-kaushan">RAPID</span> speed !
      </h2>
      <p className="category-heading">Choose your quiz category</p>

      <div className="category-container">
        {quizData.map((el) => {
          return <QuizCategory key={el._id} cardData={el} />;
        })}
      </div>
    </main>
  );
};

export { Homepage };
