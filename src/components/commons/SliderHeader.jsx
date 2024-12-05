import React from "react";

import Arrow from "../../assets/arrow.svg?react";

export const SliderHeader = ({ title, moveSlide, disabled }) => {
  const disableRight = disabled === "right" ? "disabled" : "";
  const disableLeft = disabled === "left" ? "disabled" : "";
  const noButtons = disabled === "all" ? "no-buttons" : "";

  return (
    <header className={`slider-header ${noButtons}`}>
      <h3>{title}</h3>
      <div className="slider-buttons">
        <button
          onClick={() => moveSlide("left")}
          disabled={disabled === "left"}
          className={`button with-icon ${disableLeft}`}
        >
          <Arrow className="icon rotate-180" />
        </button>
        <button
          onClick={() => moveSlide("right")}
          disabled={disabled === "right"}
          className={`button with-icon ${disableRight}`}
        >
          <Arrow className="icon" />
        </button>
      </div>
    </header>
  );
};
