const axios = require("axios"),
  { urlIdMaker } = require("./helpers/urlMakers");
const { filterList } = require("./helpers/filters");

const filterInfo = data => {
  let info = {};
  info.type = "person";
  info.img = data["profile_path"];
  info.name = data["name"];
  info.description = data["biography"].split(". ");

  info.stars = data["popularity"];
  info.origin = data["place_of_birth"];
  // startOn

  info.startOn = data["birthday"];
  info.startOn = info.startOn ? info.startOn.split("-") : [];
  // lastOn

  info.lastOn = data["deathday"];
  info.lastOn = info.lastOn ? info.lastOn.split("-") : [];

  // similar
  let related = { cast: [], crew: [] };
  if (data["combined_credits"]) {
    related.crew = data["combined_credits"]["crew"];
    related.cast = data["combined_credits"]["cast"];
  }
  related.crew = related.crew.sort((a, b) => b.popularity - a.popularity);
  related.crew = filterList(related.crew);
  related.crew = related.crew.filter(
    (item, i, arr) => i === arr.findIndex(itemB => itemB.id === item.id)
  );
  related.crew = related.crew.slice(0, 10);

  related.cast = related.cast.sort((a, b) => b.popularity - a.popularity);
  related.cast = filterList(related.cast);
  related.cast = related.cast.filter(
    (item, i, arr) => i === arr.findIndex(itemB => itemB.id === item.id)
  );
  related.cast = related.cast.slice(0, 10);

  info.related = related;

  return info;
};

exports.getById = id => {
  return axios
    .get(urlIdMaker("person", id))
    .then(res => filterInfo(res.data))
    .then(data => ({ error: false, data }))
    .catch(err => ({ error: true, data: err }));
};
