import React from "react";

const generateElements = (count, className) =>
  Array.from({ length: count }).map((_, index) => (
    <div key={index} className={className}></div>
  ));

const loaderConfig = {
  home: (
    <div className="home-load">
      <div className="top">{generateElements(7, "bar")}</div>
      <div className="bottom">{generateElements(3, "boxes")}</div>
    </div>
  ),
  details: (
    <div className="details-load">
      <div className="lateral"></div>
      <div className="not-lateral">
        <div className="top"></div>
        {generateElements(3, "lines")}
        <div className="bottom">{generateElements(3, "boxes")}</div>
      </div>
    </div>
  ),
  results: <div className="grid-load">{generateElements(9, "boxes")}</div>,
  tile: <div className="tile-load">{generateElements(5, "bar")}</div>,
  pin: <div className="pin-load">{generateElements(5, "bar")}</div>,
};

export const Loader = ({ type }) => {
  return loaderConfig[type] || <></>;
};
