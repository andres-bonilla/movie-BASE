import React from "react";

export const Trailer = ({ ytKey, name }) => {
  return (
    <div className="video-box">
      <iframe
        key={name}
        className="yt-video fade-in-large"
        title={`Trailer: ${name}`}
        src={`https://www.youtube.com/embed/${ytKey}?rel=0&showinfo=0&modestbranding=1`}
        loading="lazy"
        credentialless="true"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        allowFullScreen={true}
      />
    </div>
  );
};
