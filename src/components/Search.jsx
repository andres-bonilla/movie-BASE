import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { useQuerySetter } from "../hooks/useQuerySetter";
import { parseSearchParams } from "../helpers/parseSearchParams";

export const Search = ({ withMargin }) => {
  const { pathname, search } = useLocation();
  const { setQueryWords } = useQuerySetter();
  const navigate = useNavigate();

  const [endSpace, setEndSpace] = useState(false);
  const [words, setWords] = useState("");
  const debounceRef = useRef();

  useEffect(() => {
    if (!pathname.includes("search")) clearTimeout(debounceRef.current);
    setWords(parseSearchParams(search).words);
  }, [pathname, search]);

  const debounceSetQueryWords = newWord => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (pathname.includes("search")) setQueryWords(newWord);
      else navigate(`/search?any=${newWord}&on=1`);
    }, 500);
  };

  const wordsHandler = e => {
    e.preventDefault();
    let value = e.target.value;

    if (!value || value === " ") {
      clearTimeout(debounceRef.current);
      setWords("");
      navigate(`/search`);
      return;
    }

    setEndSpace(value.endsWith(" "));
    value = value.endsWith(" ") ? value.trim() : value;

    setWords(value);
    debounceSetQueryWords(value);
  };

  return (
    <form
      className={`search-form ${withMargin}`}
      target="search"
      onSubmit={wordsHandler}
    >
      <input
        className="search"
        onChange={wordsHandler}
        value={endSpace ? words + " " : words}
        type="text"
        name="words"
        placeholder="Buscar..."
      />
    </form>
  );
};
