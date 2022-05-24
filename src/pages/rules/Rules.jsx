import React from "react";
import "./Rules.css";
import ruleImg from "assets/img/rules.png";
import { quizData } from "data/quiz-data";
import { Link, useParams } from "react-router-dom";

export const Rules = () => {
  const { quizId } = useParams();

  const myQuizData = quizData.find((el) => el._id);

  return (
    <main class="rules-main-container">
      <div class="card-vertical rules-card">
        <img src={ruleImg} alt="" />
        <h3 class="justify-center">Rules to be followed</h3>
        <ul class="rules-main">
          <li class="rule">💪 &nbsp You will face 5 Questions</li>
          <li class="rule">💎 &nbsp The right answer will give you 2 points</li>
          <li class="rule">😄 &nbsp There is no negative marking</li>
          <li class="rule">🏆 &nbsp Score atleast 70% to win.</li>
        </ul>
        <Link to={`/${quizId}/1`}>
          <button class="btn btn-primary start-btn">Start Quiz</button>
        </Link>
      </div>
    </main>
  );
};
