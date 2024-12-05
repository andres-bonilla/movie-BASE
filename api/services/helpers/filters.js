const narrowData = (data, index, media) => {
  /*Return only key data*/
  let {
    id,
    name,
    title,
    media_type,
    poster_path,
    profile_path,
    vote_average,
    first_air_date,
    release_date,
  } = data;
  const mediaType = media === "any" ? media_type : media;
  name = mediaType === "movie" ? title : name;
  const img = mediaType === "person" ? profile_path : poster_path;
  const stars = mediaType !== "person" ? Math.round(vote_average) : 0;
  let startOn =
    mediaType === "person"
      ? ""
      : mediaType === "movie"
      ? release_date
      : first_air_date;
  startOn = startOn ? startOn.split("-") : [];

  return { index, id, mediaType, name, img, stars, startOn };
};

const meetsCriteria = (item, { genre, noPerson }) => {
  let meets = true;

  if (meets && noPerson) meets = item["media_type"] !== "person";

  if (meets && genre && genre.include.length && item["genre_ids"])
    meets = genre.include.some(id => item["genre_ids"].includes(id));

  if (meets && genre && item["genre_ids"])
    meets = !genre.exclude.some(id => item["genre_ids"].includes(id));

  return meets;
};

exports.filterByRules = (list, { fitter, amount, index, media, criteria }) => {
  const filtered = [];
  let { init, tmdb, local } = index;

  for (let last = list.length - 1, i, n = 0; n <= last && amount; n++) {
    i = fitter === -1 ? last - n : n;

    isOnRange = !tmdb || fitter * (tmdb - init - i) < 0;
    isItemAccepted =
      isOnRange && (!criteria || meetsCriteria(list[i], criteria));

    if (!local && isItemAccepted) {
      amount--;
      filtered.push(narrowData(list[i], init + i, media));
    }
    if (local && isItemAccepted) local--;
  }
  index = { init: init + fitter * 20, tmdb, local };
  return {
    data: fitter === -1 ? filtered.reverse() : filtered,
    newRules: { fitter, amount, index, media, criteria },
  };
};

exports.filterList = (list, media = "any") =>
  list
    .filter(item => {
      criteria = {
        noPerson: false,
        genre: { include: [], exclude: [10767, 10763, 10764] },
      };
      return meetsCriteria(item, criteria);
    })
    .map((item, i) => ({
      ...narrowData(item, i, media),
      backdrop: item["backdrop_path"],
    }));
