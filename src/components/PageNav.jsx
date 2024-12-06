import React from "react";
import { useSelector } from "react-redux";

import { useQuerySetter } from "../hooks/useQuerySetter";

import Arrow from "../assets/arrow.svg?react";

export const PageNav = ({ noMore, animation }) => {
  const page = useSelector(state => Math.abs(state.search.page));
  const { setQueryPage } = useQuerySetter();

  return (
    <footer className={`page-nav ${animation}`}>
      <button
        type="button"
        name="Previous"
        disabled={page === 1}
        onClick={() => setQueryPage(page - 1)}
        className={`button with-icon ${page === 1 ? "disabled" : ""}`}
      >
        <Arrow className="icon rotate-180" />
      </button>

      <span className="page-num">{page}</span>

      <button
        type="button"
        name="Next"
        disabled={noMore}
        onClick={() => setQueryPage(page + 1)}
        className={`button with-icon ${noMore ? "disabled" : ""}`}
      >
        <Arrow className="icon" />
      </button>
    </footer>
  );
};
