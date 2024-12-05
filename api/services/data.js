const axios = require("axios");
const { urlImgDataMaker, urlTopListMaker } = require("./helpers/urlMakers");
const { filterList } = require("./helpers/filters");

const filterImgData = ({ images }) => {
  return {
    url: images["base_url"],
    secureUrl: images["secure_base_url"],
    sizes: {
      backdrop: images["backdrop_sizes"],
      logo: images["logo_sizes"],
      poster: images["poster_sizes"],
      profile: images["profile_sizes"],
      still: images["still_sizes"],
    },
  };
};

exports.imgData = () => {
  return axios
    .get(urlImgDataMaker())
    .then(res => filterImgData(res.data))
    .then(data => ({ error: false, data }))
    .catch(err => ({ error: true, data: err }));
};

exports.topLists = () => {
  const reqs = [];

  urlTopListMaker().map(({ media, name, url }) =>
    reqs.push(axios.get(url).then(res => ({ media, name, data: res.data })))
  );

  return Promise.all(reqs)
    .then(allRes =>
      allRes.map(({ media, name, data }) => ({
        name,
        list: filterList(data.results.slice(0, 10), media),
      }))
    )
    .then(data => ({ error: false, data }))
    .catch(err => ({ error: true, data: err }));
};
