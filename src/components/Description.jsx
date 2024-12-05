import React from "react";

export const Description = ({ description }) => {
  const renderText = (text, i) =>
    text !== "" && (
      <p key={i} className="fade-in">
        {text}.
      </p>
    );

  return description && description.length && description[0] ? (
    description.map(renderText)
  ) : (
    <p className="fade-in-large">No hay descripción</p>
  );
};
