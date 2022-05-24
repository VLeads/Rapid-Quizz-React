import { useQuiz } from "context/data-context";
import { quizData } from "data/quiz-data";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Questions.css";

export const Questions = () => {
  const { questionIndex, quizId } = useParams();

  const [activeButton, setActiveButton] = useState(-1);

  const { state, dispatch } = useQuiz();

  const navigate = useNavigate();

  const [myQuizData, setMyQuizData] = useState();

  useEffect(() => {
    setMyQuizData(quizData.filter((el) => el._id === quizId));
  }, []);

  const questions = myQuizData?.questions;
  console.log("ques", myQuizData, quizData, quizId);

  let question = { question: "", options: [] };

  if (questions) {
    question = questions[Number(questionIndex) - 1] ?? {};
  }

  useEffect(() => {
    if (state.answers.length === 0 && Number(questionIndex) !== 1) {
      const recoveredData = JSON.parse(
        sessionStorage.getItem("answerData") || "[]"
      );
      if (recoveredData.length === 0)
        navigate(`/${quizId}/rules`, { replace: true });
      dispatch({
        type: "RECOVER_ANSWER_DATA",
        payload: { sessionData: recoveredData },
      });
    }
  }, []);

  const dispatchQuizAnswer = (
    activeButton,
    dispatch,
    questionIndex,
    questions
  ) => {
    dispatch({
      type: "ADD_QUESTION_DATA",
      payload: { questionIndex, selectedOption: activeButton },
    });
    sessionStorage.setItem(
      "answerData",
      JSON.stringify([
        ...JSON.parse(sessionStorage.getItem("answerData") || "[]"),
        { questionIndex: questionIndex, selectedOption: activeButton },
      ])
    );

    if (questionIndex === questions?.length)
      navigate(`/${quizId}/result`, { replace: true });
    else navigate(`/${quizId}/${Number(questionIndex) + 1}`, { replace: true });
    setActiveButton(-1);

    sessionStorage.removeItem("quiz-timer");
  };

  return (
    <main class="quiz-container">
      <div class="card-vertical ques">
        <h2 class="justify-center">{quizData.heading}</h2>
        <div class="ques-and-score">
          <div class="count">
            <p class="tag">Question: </p>
            <p class="tag-value">
              {questionIndex} / {questions?.length}
            </p>
          </div>
        </div>
        <div class="ques-and-ans mt-2">
          <h3>{question?.question}</h3>
          <div class="option-wrapper mb-2">
            {question.options.map((el, index) => {
              return (
                <div onClick={() => setActiveButton(index)}>
                  <input type="radio" id="option1" />
                  <label
                    for="option1"
                    className={`option ${
                      index === Number(activeButton) ? " option-active" : ""
                    }`}
                  >
                    {el.value}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <a href="cosmos-five.html">
          <button class="btn btn-primary">Next Question</button>
        </a>
      </div>
    </main>
  );
};
