import React, { useRef } from "react";

import { Tile } from "./Tile.jsx";
import { SliderHeader } from "./SliderHeader.jsx";

import { ResetScroll } from "../utils/ResetScroll.jsx";

import { useResize } from "../../hooks/useResize.jsx";
import { useMoveSlide } from "../../hooks/useMoveSlide.jsx";

export const Slider = ({ title, list = [] }) => {
  const sliderRef = useRef(null);
  const { withButtons } = useResize("slider", sliderRef);
  const { disabled, moveSlide } = useMoveSlide(sliderRef, list.length);

  const tileItem = (item, i) => (
    <li key={i + item.mediaType + item.id}>
      <Tile item={item} />
    </li>
  );

  return (
    <>
      <SliderHeader
        title={title}
        moveSlide={moveSlide}
        disabled={withButtons ? disabled : "all"}
      />

      <ResetScroll element={sliderRef ? sliderRef.current : null}>
        <main className="slider hidden-scroll fade-in" ref={sliderRef}>
          <ul className="list">{list.map(tileItem)}</ul>
        </main>
      </ResetScroll>
    </>
  );
};
