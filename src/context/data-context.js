import React, { createContext, useContext, useReducer } from "react";

const QuizContext = createContext({});

const initialState = {
  answers: [],
};

const QuizDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    function quizReducer(state, action) {
      switch (action.type) {
        case "ADD_QUESTION_DATA":
          return {
            ...state,
            answers: state.answers.some(
              (el) => el.questionIndex === action.payload.questionIndex
            )
              ? state.answers.map((el) => {
                  return el.questionIndex === action.payload.questionIndex
                    ? action.payload
                    : el;
                })
              : [...state.answers, { ...action.payload }],
          };
        case "RECOVER_ANSWER_DATA":
          return {
            ...state,
            answers: [...action.payload.sessionData],
          };
        case "RESET":
          return { ...state, answers: [] };
      }
    },
    { answers: [] }
  );

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => useContext(QuizContext);

export { QuizDataProvider, useQuiz };
