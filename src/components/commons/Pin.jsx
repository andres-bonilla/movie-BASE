import React from "react";
import { Link } from "react-router-dom";

import { ImageLoader } from "../utils/ImageLoader";

const PinLink = ({ link, isExternal, classes, children }) => {
  return isExternal ? (
    <a href={link} className={classes}>
      {children}
    </a>
  ) : (
    <Link to={link} className={classes}>
      {children}
    </Link>
  );
};

export const Pin = ({
  labelId,
  name,
  imgType,
  img,
  link,
  isExternal = false,
}) => {
  const imgConfig = { img, type: imgType, width: "small" };

  return (
    <PinLink
      link={link}
      isExternal={isExternal}
      classes={"pin-link no-link-style"}
    >
      <figure className="pin with-shadow" aria-labelledby={labelId}>
        <ImageLoader
          imgConfig={imgConfig}
          name={name}
          loader="pin"
          className="fade-in"
        />
      </figure>

      <span id={labelId} clasname="pin-label">
        {name}
      </span>
    </PinLink>
  );
};
