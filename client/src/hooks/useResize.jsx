import React, { useLayoutEffect, useState } from "react";

export const useResize = (mode, sliderRef = null) => {
  const [withButtons, setWithButtons] = useState(true);
  const [gridLength, setGridLength] = useState(0);

  const calcGridLength = () => {
    const limits = [950, 1250, 1650, 2040];
    const width = window.innerWidth;

    let limit = limits.findIndex(limitWidth => width <= limitWidth);
    limit = limit === -1 ? 7 : limit + 3;

    setGridLength(limit * 6);
  };

  const displayButtons = () => {
    if (!sliderRef) return;

    setWithButtons(
      sliderRef.current.scrollWidth - 14 > sliderRef.current.offsetWidth - 14
    );
  };

  useLayoutEffect(() => {
    const handleResize = mode === "slider" ? displayButtons : calcGridLength;

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    length: mode === "grid" ? gridLength : null,
    withButtons: mode === "slider" ? withButtons : null,
  };
};
