import React from "react";
import { Link } from "react-router-dom";

export const QuizCategory = ({ cardData }) => {
  const { _id, heading, desc, src } = cardData;

  return (
    <Link to={`/${_id}/rules`}>
      <div className="card-vertical">
        <img src={src} alt="pic" loading="lazy" />
        <div className="card-body">
          <h3 className="card-header">{heading}</h3>
          <p className="card-desc">{desc}</p>
        </div>
      </div>
    </Link>
  );
};
