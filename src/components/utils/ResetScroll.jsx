import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export const ResetScroll = ({ children, element }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    if (element) {
      setTimeout(() => {
        element.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, 50); // small delay for avoid unspected behavior
    }
  }, [location]);

  return <>{children}</>;
};
