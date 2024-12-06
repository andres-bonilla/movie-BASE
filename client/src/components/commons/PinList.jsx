import React from "react";

import { Pin } from "./Pin";

export const PinList = ({
  list,
  imgType,
  listClass,
  itemClass,
  link,
  isExternal = false,
  title = "",
}) => {
  const pinItem = (item, i) => (
    <li key={`${i}-${item.name}-${item.id}`} className={itemClass}>
      <Pin
        labelId={`${i}-${item.name}-${item.id}`}
        name={item.name}
        img={item.img}
        imgType={imgType}
        link={isExternal ? link : link + item.id}
        isExternal={isExternal}
      />
    </li>
  );

  return (
    <>
      {title && <h3>{title}</h3>}
      <ul className={listClass}>{list.map(pinItem)}</ul>
    </>
  );
};
