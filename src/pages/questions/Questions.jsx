import { actionConstants } from "context/actionConstants";
import { useQuiz } from "context/data-context";
import { useTimer } from "customHooks/useTimer";
import { quizData } from "data/quiz-data";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Questions.css";

export const Questions = () => {
  const navigate = useNavigate();

  const { quizId } = useParams();

  const [selectedOption, setSelectedOption] = useState([]);

  const {
    quizState: { currQuestion },
    quizDispatch,
  } = useQuiz();

  const [myQuizData, setMyQuizData] = useState();

  const { SET_CURRQUE, SET_ANSWERS } = actionConstants;

  const { timerSec, timerMin, sec } = useTimer();

  useEffect(() => {
    setMyQuizData(
      quizData.find(function (el) {
        return el?._id === Number(quizId);
      })
    );
  }, []);

  const questions = myQuizData?.questions;

  let question, options;

  if (questions) {
    question = questions[Number(currQuestion)]?.question;
    options = questions[Number(currQuestion)]?.options;
  }

  const nextHandler = () => {
    quizDispatch({
      type: SET_CURRQUE,
      payload: { currQue: currQuestion + 1 },
    });
  };

  const submitHandler = () => {
    quizDispatch({
      type: SET_ANSWERS,
      payload: { selectedOption },
    });
    navigate("/result");
  };

  if (timerMin === 0 && timerSec === 0) {
    submitHandler();
  }

  const formatNumber = (num) => (num < 10 ? "0" + num : num);

  return (
    <main className="quiz-container">
      <div className="card-vertical ques theme-color">
        <h2 className="justify-center">{myQuizData?.heading}</h2>
        <div className="ques-and-score">
          <div className="count">
            <p className="tag">Question: </p>
            <p className="tag-value">
              {currQuestion + 1} / {questions?.length}
            </p>
          </div>
          <div className="count">
            <p className="tag-value">
              {formatNumber(timerMin)} : {formatNumber(timerSec)}
            </p>
          </div>
        </div>
        <div className="ques-and-ans mt-2">
          <h3>{question}</h3>
          <div className="option-wrapper mb-2">
            {options?.map((el, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    selectedOption[currQuestion] = el;
                    setSelectedOption([...selectedOption]);
                  }}
                >
                  <li
                    className={`option ${
                      selectedOption[currQuestion]?.value === el.value
                        ? "option-active"
                        : ""
                    }`}
                  >
                    {el.value}
                  </li>
                </div>
              );
            })}
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={() =>
            currQuestion + 1 === questions?.length
              ? submitHandler()
              : nextHandler()
          }
        >
          {currQuestion + 1 === questions?.length ? "Submit" : "Next"}
        </button>
      </div>
    </main>
  );
};
