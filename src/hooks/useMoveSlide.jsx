import React, { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router";
import { calcScrollPosition } from "../helpers/calcScrollPosition";

export const useMoveSlide = (sliderRef, listLength) => {
  const [disabled, setDisabled] = useState("left");
  const { key } = useLocation();

  useLayoutEffect(() => {
    setDisabled("left");
  }, [key]);

  const moveSlide = direction => {
    if (!sliderRef || !sliderRef.current) return;

    const nextPosition = calcScrollPosition(direction, sliderRef, listLength);

    // Scroll to the next item after disable buttons
    setTimeout(() => {
      sliderRef.current.scrollTo({
        left: nextPosition,
        behavior: "smooth",
      });
    }, 50);

    // Disable buttons
    const completeWidth = sliderRef.current.scrollWidth - 14; //without list margin
    const visibleWidth = sliderRef.current.offsetWidth - 14; //without list margin
    const isAtStart = nextPosition === 0;
    const isAtEnd = nextPosition >= completeWidth - visibleWidth;
    setDisabled(isAtStart ? "left" : isAtEnd ? "right" : "none");
  };

  return { disabled, moveSlide };
};
