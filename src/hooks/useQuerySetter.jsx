import React from "react";
import { useSearchParams } from "react-router-dom";

export const useQuerySetter = () => {
  const [query, setQuery] = useSearchParams();

  const setQueryType = newType => {
    setQuery(prev => {
      const prevEntries = Object.fromEntries(prev.entries());
      const prevType = Object.keys(prevEntries)[0] || "any";

      return {
        [newType]: prev.get(prevType) || "",
        on: 1,
      };
    });
  };

  const setQueryWords = value => {
    setQuery(prev => {
      const prevEntries = Object.fromEntries(prev.entries());
      const prevType = Object.keys(prevEntries)[0] || "any";

      if (prev.get(prevType) === value) return prev;

      prev.set(prevType, value);
      prev.set("on", 1);

      return prev;
    });
  };

  const setQueryPage = value => {
    setQuery(prev => {
      prev.set("on", value);

      return prev;
    });
  };

  return {
    setQueryType,
    setQueryWords,
    setQueryPage,
  };
};
