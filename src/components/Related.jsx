import React from "react";

import { Slider } from "./commons/Slider";

export const Related = ({ type, related, animation }) => {
  if (!related) return null;

  const renderSection = (title, list) =>
    list && list.length > 0 && <Slider title={title} list={list} />;

  return (
    <footer className={`related with-left-space ${animation}`}>
      {type === "person" ? (
        <>
          {renderSection("Reparto", related.cast)}
          {renderSection("Equipo", related.crew)}
        </>
      ) : (
        renderSection("Recomendado", related.similar)
      )}
    </footer>
  );
};
