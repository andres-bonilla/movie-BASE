import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { Tabs } from "../components/Tabs.jsx";
import { Grid } from "../components/Grid.jsx";
import { PageNav } from "../components/PageNav.jsx";

import { Alert } from "../components/utils/Alert.jsx";

import { useResize } from "../hooks/useResize.jsx";
import { useApi } from "../hooks/useApi.jsx";

import { getContentByStatus } from "../helpers/getContentByStatus.jsx";

const validateParams = (type, page) => {
  const validTypes = ["any", "movie", "tv", "movie_or_tv", "person"];

  const isValidType = validTypes.includes(type);
  const isValidPage = page && !Number.isNaN(page);
  return isValidType && isValidPage;
};

export const Results = () => {
  const { type, words, page, animation } = useSelector(state => state.search);
  const { length } = useResize("grid");

  const oldLengthRef = useRef(length);
  const indexRef = useRef({ first: 0, last: 0 });

  const hasValidParams = validateParams(type, page);

  const indexKey = page < 0 ? "first" : "last";
  const hasResized = oldLengthRef.current !== length;
  const tmdbIndex = page !== 1 && !hasResized ? indexRef.current[indexKey] : 0;

  const apiUrl =
    words && hasValidParams
      ? `/api/search/${type}?by_words=${words}&on_page=${page}&amount=${length}`
      : "";

  const { status, data, error } = useApi(
    {
      method: "get",
      url: apiUrl,
      params: { tmdb_index: tmdbIndex },
    },
    700 /*animated transition - out duration*/
  );

  const noResults = status === "success" && data && data.length === 0;

  useEffect(() => {
    if (status !== "success") return;

    const newIndex = noResults
      ? { first: 0, last: 0 }
      : { first: data[0].index, last: data[data.length - 1].index };

    indexRef.current = newIndex;
    oldLengthRef.current = length;
  }, [status]);

  const contentByStatus = !words ? (
    <Alert>¡Haz una búsqueda!</Alert>
  ) : noResults ? (
    <Alert>No hay resultados para esta búsqueda.</Alert>
  ) : (
    getContentByStatus(
      "results",
      hasValidParams ? status : "error",
      hasValidParams ? error : { type: "400", message: "" },
      !data
    )
  );

  return (
    <>
      <Tabs />
      {contentByStatus || (
        <>
          <Grid
            data={data}
            animation={status === "delaying" ? animation.out : animation.in}
          />
          {data.length > 0 && (
            <PageNav
              noMore={data.length < length}
              animation={status === "delaying" ? "fade-out" : "fade-in"}
            />
          )}
        </>
      )}
    </>
  );
};
