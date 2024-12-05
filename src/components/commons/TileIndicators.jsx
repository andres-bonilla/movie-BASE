import React from "react";

export const TileIndicators = ({ media, realized, rating = 0 }) => {
  const espMedia = {
    movie: "Pelicula",
    tv: "Serie",
    person: "Persona",
  };

  return (
    <div className="tile-indicators">
      <span className="type">{espMedia[media]}</span>
      <span className="year">{realized}</span>
      {rating !== 0 && (
        <div className={`rating-bar bar-${rating}`}>
          <span className="rating">{rating}</span>
        </div>
      )}
    </div>
  );
};
