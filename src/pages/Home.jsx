import React from "react";

import { Slider } from "../components/commons/Slider.jsx";
import { Hero } from "../components/Hero.jsx";

import { useApi } from "../hooks/useApi.jsx";

import { getContentByStatus } from "../helpers/getContentByStatus.jsx";

export const Home = () => {
  const { status, data, error } = useApi(
    {
      method: "get",
      url: `/api/data/top_lists`,
    },
    700 /*animated transition - out duration*/
  );

  const noData = !data || data.length === 0;
  const contentByStatus = getContentByStatus("home", status, error, noData);
  const animation = status === "delaying" ? "bottom-out" : "bottom-in";

  const topList = (item, i) => {
    /*if (i === 0) return;*/
    return (
      item.list.length !== 0 && (
        <div key={item.name + i} className={`top-list ${animation}`}>
          <Slider key={item.name + i} title={item.name} list={item.list} />
        </div>
      )
    );
  };

  return (
    contentByStatus || (
      <>
        {/*<Hero list={data[0].list} />*/}
        {data.map(topList)}
      </>
    )
  );
};
