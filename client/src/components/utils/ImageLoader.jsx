import React, { useState } from "react";

import { Loader } from "./Loader";

import { useImgUrl } from "../../hooks/useImgUrl";

export const ImageLoader = ({ imgConfig, name, loader, className = "" }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { imgUrl } = useImgUrl(imgConfig.img, imgConfig.type, imgConfig.width);

  const handleOnLoad = () => setIsLoading(false);

  return (
    <>
      {isLoading && (
        <div className={`load-box ${className}`}>
          <Loader type={loader} />
        </div>
      )}
      <img
        src={imgUrl}
        alt={name}
        onLoad={handleOnLoad}
        className={`${className} ${isLoading ? "hidden" : ""}`}
      />
    </>
  );
};
