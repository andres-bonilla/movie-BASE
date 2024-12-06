const urlTmdb = "https://api.themoviedb.org/3",
  apiKey = `api_key=${process.env.TMDB_API_KEY}`,
  apiLang = "language=es-MX",
  extras = "similar,recommendations,credits,videos,watch/providers";

exports.urlSearchMaker = (mediaType, words, page = "1") =>
  `${urlTmdb}/search/${mediaType}?query=${words}&${apiKey}&${apiLang}&page=${page}`;

exports.urlIdMaker = (mediaType, id) => {
  if (mediaType === "person") {
    return `${urlTmdb}/${mediaType}/${id}?append_to_response=combined_credits&${apiKey}&${apiLang}`;
  } else {
    return `${urlTmdb}/${mediaType}/${id}?append_to_response=${extras}&${apiKey}&${apiLang}`;
  }
};

exports.urlImgDataMaker = () => `${urlTmdb}/configuration?${apiKey}`;

exports.urlTopListMaker = () => [
  {
    media: "movie",
    name: "Popular",
    url: `${urlTmdb}/movie/popular?${apiKey}&${apiLang}`,
  },
  {
    media: "any",
    name: "Trending",
    url: `${urlTmdb}/trending/all/day?${apiKey}&${apiLang}`,
  },
  {
    media: "tv",
    name: "Top Rated",
    url: `${urlTmdb}/tv/top_rated?${apiKey}&${apiLang}`,
  },
];

//    `${urlTmdb}/movie/latest?${apiKey}&${apiLang}`,
