import React from "react";
import "./Homepage.css";
import { Footer, Header } from "components";
import cosmos from "assets/img/cosmos.jpg";
import tech from "assets/img/tech.jpg";
import { QuizCategory } from "./component/QuizCategory";
import { quizData } from "data/quiz-data";

const Homepage = () => {
  return (
    <main className="quiz-main-container">
      <h2>
        Unlocking knowledge at
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
