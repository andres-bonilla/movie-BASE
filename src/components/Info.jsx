import React from "react";

import { Trailer } from "./Trailer";
import { Description } from "./Description";
import { PinList } from "./commons/PinList";

export const Info = ({ name, description, trailer, cast, crew, animation }) => {
  const renderPinList = (title, list) =>
    list.length !== 0 && (
      <PinList
        list={list}
        imgType="profile"
        listClass="credits"
        itemClass="person-pin"
        link="/details/person/"
        title={title}
      />
    );

  return (
    <main className={`info with-left-space ${animation}`}>
      {trailer && <Trailer ytKey={trailer} name={name} />}

      <h1 className="info-title">{name}</h1>
      <Description description={description} />

      {renderPinList("Reparto", cast)}
      {renderPinList("Equipo", crew)}
    </main>
  );
};
