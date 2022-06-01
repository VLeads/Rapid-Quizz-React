import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./Result.css";
import trophy from "assets/img/trophy.png";
import { useQuiz } from "context/data-context";
import { quizData } from "data/quiz-data";
import { AlertIcon, CheckIcon, CrossIcon } from "assets/icons/icons";
import { actionConstants } from "context/actionConstants";

export const Result = () => {
  const {
    quizState: { selectedOptions, quizStarted },
    quizDispatch,
  } = useQuiz();
  const currQuiz = sessionStorage.getItem("currQuiz");

  const myQuizData = quizData.find((quiz) => quiz?._id === Number(currQuiz));

  const questions = myQuizData?.questions;

  const [scores, setScores] = useState(Array(questions?.length).fill(0));

  const currTotal = useRef(0);

  const { UPDATE_USER } = actionConstants;

  const calcScore = () => {
    let currQuizTotal = 0;
    for (let i = 0; i < questions.length; i++) {
      if (selectedOptions[i]?.isCorrect) {
        currQuizTotal += 10;
      }
    }
    if (
      currTotal.current !== currQuizTotal ||
      (currTotal.current === 0 && currQuizTotal === 0)
    ) {
      const quizPass =
        currQuizTotal >= questions?.length * 10 * (70 / 100) ? true : false;
      quizDispatch({
        type: UPDATE_USER,
        payload: {
          addScore: currQuizTotal,
          addQuiz: myQuizData?.heading,
          quizPass,
          quizId: myQuizData?._id,
        },
      });
    }
    currTotal.current = currQuizTotal;
    setScores(
      questions.map((_, id) => (selectedOptions[id]?.isCorrect ? 10 : 0))
    );
  };

  useEffect(() => {
    calcScore();
  }, []);

  return (
    <main className="result-container">
      <h1 className="justify-center mb-1">Result</h1>
      <img src={trophy} alt="trophy" className="trophy-img" loading="lazy" />
      <h2 className="justify-center mt-2 mb-2">
        Final Score:{" "}
        <span className="tag-value">
          {currTotal.current}/{questions.length * 10}
        </span>
      </h2>
      <div className="quiz-container">
        {questions.map((questionGrp, currQuesId) => {
          return (
            <div className="card-vertical ques theme-color" key={currQuesId}>
              <div className="ques-and-score">
                <div className="count">
                  <p className="tag">Question: &nbsp;</p>
                  <p className="tag-value">{currQuesId + 1}</p>
                </div>
                <div className="count">
                  <p className="tag">Score: &nbsp;</p>
                  <p className="tag-value">{scores[currQuesId]}/10</p>
                </div>
              </div>
              <div className="ques-and-ans mt-2">
                <h3>{questionGrp.question}</h3>
                <div className="option-wrapper mb-2">
                  {questionGrp.options.map((option, id) => (
                    <div
                      key={id}
                      className={`option ${
                        selectedOptions[currQuesId]?.isCorrect &&
                        selectedOptions[currQuesId]?.value === option.value
                          ? "option-correct"
                          : selectedOptions[currQuesId]?.value === option.value
                          ? "option-wrong"
                          : ""
                      } `}
                    >
                      {option.value}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};
