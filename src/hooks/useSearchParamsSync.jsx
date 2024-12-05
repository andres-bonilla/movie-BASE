import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { setSearch } from "../store/searchSlice";
import { parseSearchParams } from "../helpers/parseSearchParams";

export const useSearchParamsSync = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const { type, words, page } = parseSearchParams(search);

    if (page <= 0) {
      const fixedPage = Math.abs(page) || 1;
      navigate(`/search?${type}=${words}&on=${fixedPage}`);
      return;
    }

    dispatch(setSearch({ type, words, page }));
  }, [search]);
};
