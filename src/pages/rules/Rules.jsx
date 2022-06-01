import React, { useEffect } from "react";
import "./Rules.css";
import ruleImg from "assets/img/rules.png";
import { quizData } from "data/quiz-data";
import { Link, useParams } from "react-router-dom";
import { useQuiz } from "context/data-context";
import { actionConstants } from "context/actionConstants";

export const Rules = () => {
  const currQuiz = sessionStorage.getItem("currQuiz");

  const { quizDispatch } = useQuiz();

  const { START_QUIZ } = actionConstants;

  useEffect(() => {
    quizDispatch({ type: START_QUIZ });
  }, []);

  return (
    <main className="rules-main-container">
      <div className="card-vertical rules-card theme-color">
        <img src={ruleImg} alt="" />
        <h3 className="justify-center">Rules to be followed</h3>
        <ul className="rules-main">
          <li className="rule">💪 &nbsp; You will face 5 Questions</li>
          <li className="rule">
            💎 &nbsp; The right answer will give you 10 points
          </li>
          <li className="rule">😄 &nbsp; There is no negative marking</li>
          <li className="rule">🏆 &nbsp; Score atleast 70% to win.</li>
        </ul>
        <Link to={`/questions/${currQuiz}`}>
          <button className="btn btn-primary start-btn">Start Quiz</button>
        </Link>
      </div>
    </main>
  );
};
