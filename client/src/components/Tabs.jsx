import React from "react";
import { useSelector } from "react-redux";

import { useQuerySetter } from "../hooks/useQuerySetter";

export const Tabs = () => {
  const { type } = useSelector(state => state.search);
  const { setQueryType } = useQuerySetter();
  const tabTypes = {
    eng: ["any", "movie", "tv", "person"],
    esp: ["Todo", "Pelicula", "Serie", "Persona"],
  };

  const checkHandler = ({ checked }, name) => {
    let value = checked ? name : "any";

    if (type === "tv" && checked && name === "movie") value = "movie_or_tv";
    if (type === "movie" && checked && name === "tv") value = "movie_or_tv";

    if (type === "movie_or_tv" && !checked && name === "tv") value = "movie";
    if (type === "movie_or_tv" && !checked && name === "movie") value = "tv";

    setQueryType(value);
  };

  const tabItem = (item, i) => {
    return (
      <label
        key={i}
        className="button with-text tab"
        tabIndex="0"
        role="button"
      >
        <input
          onChange={e => checkHandler(e.target, item)}
          checked={type.indexOf(item) !== -1}
          type="checkbox"
          name={item}
          className="hidden"
        />
        <span>{tabTypes.esp[i]}</span>
      </label>
    );
  };

  return <header className="tabs">{tabTypes.eng.map(tabItem)}</header>;
};
