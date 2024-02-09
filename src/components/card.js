import React from "react";
import "../App.css";

const Card = ({ title, leftClick, rightClick, id }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="button-container">
        <div className={leftClick ? "button-visible" : "button-hidden"}>
          <button id={id} onClick={leftClick}>
            ←
          </button>
        </div>
        <div className={rightClick ? "button-visible" : "button-hidden"}>
          <button id={id} onClick={rightClick} name="right">
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
