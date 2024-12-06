import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import noImg from "../assets/no-img.svg";
import smallNoImg from "../assets/small-no-img.svg";

export const useImgUrl = (path, type, width) => {
  const { secureUrl, sizes } = useSelector(state => state.img);
  const [imgUrl, setImgUrl] = useState("");
  const sizeWidths = {
    poster: { small: 1, medium: 3, large: 5 },
    profile: { small: 1, medium: 2, large: 3 },
    backdrop: { small: 0, medium: 1, large: 2 },
    logo: { small: 1, medium: 3, large: 5 },
    still: { small: 0, medium: 1, large: 2 },
  };

  useEffect(() => {
    let sizeIndex;
    if (type && width) sizeIndex = sizeWidths[type][width];

    if (secureUrl && path && sizeIndex !== undefined) {
      setImgUrl(`${secureUrl}${sizes[type][sizeIndex]}${path}`);
    } else {
      setImgUrl(width === "small" ? smallNoImg : noImg);
    }
    return () => setImgUrl("");
  }, [path]);

  return { imgUrl };
};
