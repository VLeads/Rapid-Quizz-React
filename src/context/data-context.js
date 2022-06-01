import React, { createContext, useContext, useReducer } from "react";
import { actionConstants } from "./actionConstants";

const QuizContext = createContext({});

const QuizDataProvider = ({ children }) => {
  const [quizState, quizDispatch] = useReducer(
    function quizReducer(state, action) {
      const { SET_CURRQUE, SET_ANSWERS, RESET, UPDATE_USER, START_QUIZ } =
        actionConstants;

      switch (action.type) {
        case START_QUIZ: {
          return {
            ...state,
            quizStarted: true,
          };
        }
        case SET_CURRQUE: {
          return {
            ...state,
            currQuestion: action.payload.currQue,
          };
        }
        case SET_ANSWERS: {
          return {
            ...state,
            selectedOptions: [...action.payload.selectedOption],
          };
        }

        case UPDATE_USER: {
          return {
            ...state,
            totalScore: state.totalScore + action.payload.addScore,
            quizzesAttempted: [
              ...state.quizzesAttempted,
              {
                quizCategory: action.payload.addQuiz,
                quizScore: action.payload.addScore,
                quizPass: action.payload.quizPass,
                quizId: action.payload.quizId,
              },
            ],
          };
        }
        case RESET: {
          return {
            ...state,
            currQuestion: 0,
            selectedOptions: [],
          };
        }
        default:
          return state;
      }
    },
    {
      currQuestion: 0,
      selectedOptions: [],
      totalScore: 0,
      quizzesAttempted: [],
      quizStarted: false,
    }
  );

  return (
    <QuizContext.Provider value={{ quizState, quizDispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => useContext(QuizContext);

export { QuizDataProvider, useQuiz };
