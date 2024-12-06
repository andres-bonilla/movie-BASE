import React from "react";
import { useNavigate } from "react-router";

const textMap = {
  400: {
    title: "400 - Invalid Parameters",
    text: "The page you requested couldn't be loaded due to invalid parameters.",
  },
  404: {
    title: "404 - Page Not Found",
    text: "Oops! The page you're looking for doesn't exist.",
  },
  500: {
    title: "500 - Server Error",
    text: "There was a problem on our end. Please try again later.",
  },
  network: {
    title: "Network Error",
    text: "It seems you're offline. Please check your internet connection and try again.",
  },
  imageLoad: {
    title: "Image Data Loading Error",
    text: "We couldn't load the requested data. Please refresh the page or try again later.",
  },
  dataLoad: {
    title: "Data Loading Error",
    text: "We couldn't load the requested data. Please refresh the page or try again later.",
  },
  error: {
    title: "Oops! Something went wrong.",
    text: "An unexpected error occurred. Please try again.",
  },
};

export const ErrorMessage = ({ type, error }) => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="error-message fade-in">
      <h2>{textMap[type].title}</h2>
      <p>{error?.message || textMap[type].text}</p>
      <button className="button with-text" onClick={goHome}>
        Go to Home
      </button>
    </div>
  );
};
