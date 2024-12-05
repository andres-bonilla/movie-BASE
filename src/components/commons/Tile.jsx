import React from "react";
import { Link } from "react-router-dom";

import { TileIndicators } from "./TileIndicators";

import { ImageLoader } from "../utils/ImageLoader";

export const Tile = ({ item }) => {
  const { id, name, img, mediaType, stars, startOn } = item;

  const imgConfig = {
    img: img,
    type: mediaType === "person" ? "profile" : "poster",
    width: "medium",
  };

  const linkUrl = `/details/${mediaType}/${id}`;

  const realizedOn = mediaType !== "person" && startOn.length ? startOn[0] : "";

  return (
    <Link to={linkUrl} className="tile-link no-link-style ">
      <figure className={`tile with-shadow ${mediaType}-mode`}>
        <TileIndicators
          rating={stars}
          media={mediaType}
          realized={realizedOn}
        />

        <ImageLoader
          imgConfig={imgConfig}
          name={name}
          loader="tile"
          className="tile-img fade-in"
        />

        <figcaption className="tile-label">{name}</figcaption>
      </figure>
    </Link>
  );
};
