import React, { useState, useEffect } from "react";
import apiClient from "./axiosClient";

export const useApi = (config, delay = 0) => {
  // "idle", "delaying", "loading", "success", "error"
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState([]);
  const [error, setError] = useState({ type: "", message: "" });

  const errorCodes = {
    400: "400",
    404: "404",
    500: "500",
  };

  const resetState = () => {
    setStatus("idle");
    setData([]);
    setError({ type: "", message: "" });
  };

  useEffect(() => {
    if (!config.url) {
      resetState();
      return;
    }
    let statusByInterval;
    setStatus(delay === 0 ? "loading" : "delaying");

    const handleError = errorData => {
      const errorType =
        errorData.response?.status in errorCodes
          ? errorCodes[errorData.response.status]
          : errorData.message.includes("Network Error")
          ? "network"
          : "error";

      const message = errorType === "error" ? errorData.message : "";

      setError({ type: errorType, message });
      setStatus("error");
      setData([]);
      clearInterval(statusByInterval);
    };

    const handleSuccess = resultData => {
      setData(resultData);
      setStatus("success");
      clearInterval(statusByInterval);
    };

    const apiCall = request => {
      let interval = delay === 0 ? 300 : delay / 2;
      let counter = delay === 0 ? 0 : -2;
      let isDataReady = false;
      let result = [];

      statusByInterval = setInterval(() => {
        counter++;
        if (counter >= 0 && isDataReady) return handleSuccess(result);
        if (counter === 0) setStatus("loading");
        if (counter === 500) {
          apiController.abort();
          handleError(new Error("Request timed out. Try again later"));
        }
      }, interval);

      apiClient(request)
        .then(res => {
          result = res.data;
          isDataReady = true;
        })
        .catch(reqError => {
          // Ignore AbortController error by unmount
          if (apiClient.isCancel(reqError))
            return clearInterval(statusByInterval);

          handleError(reqError);
        });
    };

    const apiController = new AbortController();
    apiCall({ ...config, signal: apiController.signal });
    return () => {
      apiController.abort();
      clearInterval(statusByInterval);
    };
  }, [config.url]);

  return { status, data, error };
};
