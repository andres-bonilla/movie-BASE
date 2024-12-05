import React from "react";

import { PinList } from "./commons/PinList.jsx";

import { ImageLoader } from "./utils/ImageLoader.jsx";

export const Belt = ({ name, img, imgType, providers, animation }) => {
  const imgConfig = { img, type: imgType, width: "large" };

  return (
    <header className={`belt ${animation}`}>
      <div className="buckle">
        <ImageLoader
          key={name}
          imgConfig={imgConfig}
          name={name}
          loader="tile"
          className="poster with-shadow fade-in"
        />
        {providers && (
          <PinList
            list={providers.list}
            imgType="logo"
            listClass="providers"
            itemClass="provider-pin"
            link={providers.tmdbLink}
            isExternal={true}
          />
        )}
      </div>
    </header>
  );
};
