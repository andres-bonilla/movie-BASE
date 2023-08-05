import axios from "axios";
import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setImg } from "../store/img";
import { Mediafile } from "../components/Mediafile";
import { Footbar } from "./Footbar";
import { Navbar } from "./Navbar";
import { Access } from "./Access";
import { Enroll } from "./Enroll";
import { Results } from "./Results";
import { resetSearch } from "../store/searchSlice";

export const App = () => {
  const dispatch = useDispatch(),
    navigate = useNavigate(),
    location = useLocation();

  const search = useSelector((state) => state.search);

  useEffect(() => {
    axios.get("/api/data/img_data").then(({ data }) => {
      dispatch(setImg(`${data["secure_base_url"]}${data["poster_sizes"][1]}`));
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (search.words !== "")
      navigate(`/search/${search.mediaType}/${search.words}/on/${search.page}`);
  }, [search.words, search.mediaType, search.page, search.maxElementsGrid]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let isNotSearch =
      !(search.words === "") &&
      (location.pathname === "/" || !(location.pathname[1] === "s"));

    if (isNotSearch) dispatch(resetSearch());
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id="container">
      <Navbar />

      <div id="content">
        <Routes>
          <Route path="/" element={<></>} />

          <Route path="/access" element={<Access />} />

          <Route path="/enroll" element={<Enroll />} />

          <Route path="/search" element={<Results />} />

          <Route path="/search/:type/:words" element={<Results />} />

          <Route path="/search/:type/:words/on/:page" element={<Results />} />

          <Route path="/:type/:id" element={<Mediafile />} />

          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </div>

      <Footbar />
    </div>
  );
};
