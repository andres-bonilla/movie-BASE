import React, { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useDispatch } from "react-redux";

import { setImgData } from "./store/img";

import { Head } from "./layouts/Head.jsx";
import { Home } from "./pages/Home.jsx";
import { Results } from "./pages/Results.jsx";
import { Details } from "./pages/Details.jsx";
import { Foot } from "./layouts/Foot.jsx";

import { ResetScroll } from "./components/utils/ResetScroll.jsx";
import { ErrorMessage } from "./components/utils/ErrorMessage.jsx";

import { useApi } from "./hooks/useApi.jsx";
import { useSearchParamsSync } from "./hooks/useSearchParamsSync.jsx";

import { getContentByStatus } from "./helpers/getContentByStatus.jsx";

export const App = () => {
  const dispatch = useDispatch();
  useSearchParamsSync();

  const { status, data, error } = useApi({
    method: "get",
    url: "/api/data/img_data",
  });

  useEffect(() => {
    if (status === "success" && data) dispatch(setImgData(data));
  }, [status]);

  const contentByStatus = getContentByStatus("app", status, error, !data);

  const colorMode = "light-mode";

  return (
    <>
      <Head colorMode={colorMode} />

      <ResetScroll element={window}>
        <main id="content" className={colorMode}>
          {contentByStatus || (
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/search" element={<Results />} />

              <Route path="/details/:type/:id" element={<Details />} />

              <Route path="*" element={<ErrorMessage type="404" />} />
            </Routes>
          )}
        </main>
      </ResetScroll>

      <Foot colorMode={colorMode} />
    </>
  );
};
