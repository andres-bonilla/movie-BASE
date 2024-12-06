import React from "react";

import { Slider } from "./commons/Slider";
import { useImgUrl } from "../hooks/useImgUrl";

export const Hero = ({ list }) => {
  const imgIndex = 3;
  const backImgUrl = useImgUrl(list[imgIndex].backdrop, "backdrop", "large");
  const imgUrl = useImgUrl(list[imgIndex].img, "poster", "large");

  return (
    <div id="hero" style={{ "--back_img_url": `url("${backImgUrl}")` }}>
      <img src={imgUrl} className="hero-img" />

      <Slider data={list} boxClass={"hero-list-container"} />
    </div>
  );
};
