const axios = require("axios"),
  { urlIdMaker } = require("./helpers/urlMakers");
const { filterList } = require("./helpers/filters");

const filterInfo = data => {
  let info = {};
  //homepage, popularity
  info.id = data["id"];
  info.type = "movie";
  info.name = data["title"];
  info.img = data["poster_path"];
  info.backdrop = data["backdrop_path"];
  info.description = data["overview"].split(". ");
  info.state = data["status"];
  info.lang = data["original_language"];
  info.genres = data["genres"];
  info.companies = data["production_companies"];
  info.stars = data["vote_average"];
  info.origin = data["production_countries"];
  info.lastOn = [];

  // startOn
  info.startOn = data["release_date"];
  info.startOn = info.startOn ? info.startOn.split("-") : [];

  // related
  info.related = { similar: [] };
  info.related.similar = data["recommendations"]
    ? data["recommendations"]["results"]
    : [];
  info.related.similar = filterList(info.related.similar, "movie");
  info.related.similar = info.related.similar.filter(
    (item, i, arr) => i === arr.findIndex(itemB => itemB.id === item.id)
  );
  info.related.similar = info.related.similar.slice(0, 10);

  //trailer
  const index = data.videos.results.findLastIndex(
    item => item.site === "YouTube" && item.type === "Trailer"
  );
  info.trailer = index !== -1 ? data.videos.results[index].key : "";

  //providers
  info.providers = { tmdbLink: "", list: [] };
  if (data["watch/providers"].results["AR"]) {
    info.providers.tmdbLink = data["watch/providers"].results["AR"].link;
    let list = Object.values(data["watch/providers"].results["AR"]);

    if (list.length) {
      list.shift();
      list = list.flat();
    }
    list = list.filter(
      (item, i) =>
        i ===
        list.findIndex(other => other["provider_id"] === item["provider_id"])
    );

    info.providers.list = list.map(item => {
      return {
        id: item["provide_id"],
        name: item["provider_name"],
        img: item["logo_path"],
      };
    });
  }

  // cast
  let cast = data.credits.cast.slice(0, 5);
  info.cast = cast.map(item => ({
    id: item["id"],
    name: item["name"],
    img: item["profile_path"],
    character: item["character"],
  }));

  // crew
  let crew = data.credits.crew.slice(0, 3);
  info.crew = crew.map(item => ({
    id: item["id"],
    name: item["name"],
    img: item["profile_path"],
  }));

  return info;
};

exports.getById = id => {
  return axios
    .get(urlIdMaker("movie", id))
    .then(res => filterInfo(res.data))
    .then(data => ({ error: false, data }))
    .catch(err => ({ error: true, data: err }));
};
