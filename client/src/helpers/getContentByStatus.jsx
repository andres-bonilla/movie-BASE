import React from "react";

import { Loader } from "../components/utils/Loader";
import { ErrorMessage } from "../components/utils/ErrorMessage";

export const getContentByStatus = (type, status, err, isEmpty) => {
  const contentMap = {
    delaying: null,
    loading: <Loader type={type === "app" ? "home" : type} />,
    error: <ErrorMessage type={err.type} error={err} />,
    success: null,
    empty: <ErrorMessage type={type === "app" ? "imageLoad" : "dataLoad"} />,
  };
  console.log(status);
  if (status === "success" && isEmpty) return contentMap.empty;
  return contentMap[status];
};
