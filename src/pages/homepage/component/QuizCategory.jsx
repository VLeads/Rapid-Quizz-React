import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const QuizCategory = ({ cardData }) => {
  const { _id, heading, desc, src } = cardData;

  const navigate = useNavigate();

  const clickHandler = (categoryId) => {
    navigate("/rules");
    sessionStorage.setItem("currQuiz", categoryId);
  };

  return (
    <div className="card-vertical" onClick={() => clickHandler(_id)}>
      <img src={src} alt="pic" loading="lazy" />
      <div className="card-body">
        <h3 className="card-header">{heading}</h3>
        <p className="card-desc">{desc}</p>
      </div>
    </div>
  );
};