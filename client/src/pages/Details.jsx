import React from "react";
import { useParams } from "react-router";

import { Belt } from "../components/Belt.jsx";
import { Info } from "../components/Info.jsx";
import { Related } from "../components/Related.jsx";

import { useApi } from "../hooks/useApi.jsx";

import { getContentByStatus } from "../helpers/getContentByStatus.jsx";

const validateParams = (type, id) => {
  const validTypes = ["any", "movie", "tv", "person"];
  const numId = Number(id);

  const isValidType = validTypes.includes(type);
  const isValidId = id && Number.isInteger(numId) && numId > 0;
  return isValidType && isValidId;
};

export const Details = () => {
  const { type, id } = useParams();
  const hasValidParams = validateParams(type, id);

  const { status, data, error } = useApi(
    {
      method: "get",
      url: hasValidParams ? `/${type}/${id}` : "",
    },
    700 /*animated transition - out duration*/
  );

  const contentByStatus = getContentByStatus(
    "details",
    hasValidParams ? status : "error",
    hasValidParams ? error : { type: "400", message: "" },
    !data
  );

  return (
    contentByStatus || (
      <>
        <Belt
          imgType={type !== "person" ? "poster" : "profile"}
          name={data.name}
          img={data.img}
          providers={data?.providers ?? null}
          animation={status === "delaying" ? "left-out" : "left-in"}
        />
        <Info
          name={data.name}
          description={data.description}
          trailer={data?.trailer ?? ""}
          cast={data?.cast ?? []}
          crew={data?.crew ?? []}
          animation={status === "delaying" ? "right-out" : "right-in"}
        />
        <Related
          type={type}
          related={data.related}
          animation={status === "delaying" ? "right-out" : "right-in"}
        />
      </>
    )
  );
};
