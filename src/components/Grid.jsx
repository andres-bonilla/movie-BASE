import React from "react";

import { Tile } from "./commons/Tile.jsx";

export const Grid = ({ data, animation }) => {
  const tileItem = (item, i) => (
    <li key={item.mediaType + item.id + i}>
      <Tile item={item} />
    </li>
  );

  return <ul className={`grid ${animation}`}>{data.map(tileItem)}</ul>;
};
