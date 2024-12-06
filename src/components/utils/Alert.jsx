import React from "react";

export const Alert = ({ children }) => {
  return (
    <div className="alert fade-in">
      <h2>{children}</h2>
    </div>
  );
};
