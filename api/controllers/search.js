const search = require("../services/search");
const { initRules, resError } = require("./helpers/utils");

exports.anyByWords = (req, res) => {
  const tmdbIndex = Number(req.query["tmdb_index"]);
  const amount = Number(req.query["amount"]);
  const page = Number(req.query["on_page"]);
  const words = req.query["by_words"];

  let { stPage, rules } = initRules(amount, page, tmdbIndex);

  if (rules.index.tmdb) rules.index.local = 0;
  rules.media = "any";
  rules.criteria = {
    noPerson: false,
    genre: { include: [], exclude: [10767, 10763, 10764] },
  };
  search
    .anyByWords(words, stPage, rules)
    .then(({ error, data }) => (error ? resError(res, data) : res.send(data)));
};

exports.movieOrTvByWords = (req, res) => {
  const tmdbIndex = Number(req.query["tmdb_index"]);
  const amount = Number(req.query["amount"]);
  const page = Number(req.query["on_page"]);
  const words = req.query["by_words"];

  let { stPage, rules } = initRules(amount, page, tmdbIndex);

  if (rules.index.tmdb) rules.index.local = 0;
  rules.media = "any";
  rules.criteria = {
    noPerson: true,
    genre: { include: [], exclude: [10767, 10763, 10764] },
  };
  search
    .movieOrTvByWords(words, stPage, rules)
    .then(({ error, data }) => (error ? resError(res, data) : res.send(data)));
};

exports.movieByWords = (req, res) => {
  const tmdbIndex = Number(req.query["tmdb_index"]);
  const amount = Number(req.query["amount"]);
  const page = Number(req.query["on_page"]);
  const words = req.query["by_words"];

  let { stPage, rules } = initRules(amount, page, tmdbIndex, true);

  if (rules.index.tmdb) rules.index.local = 0;
  rules.media = "movie";
  rules.criteria = null;

  search
    .movieByWords(words, stPage, rules)
    .then(({ error, data }) => (error ? resError(res, data) : res.send(data)));
};

exports.tvByWords = (req, res) => {
  const tmdbIndex = Number(req.query["tmdb_index"]);
  const amount = Number(req.query["amount"]);
  const page = Number(req.query["on_page"]);
  const words = req.query["by_words"];

  let { stPage, rules } = initRules(amount, page, tmdbIndex);

  if (rules.index.tmdb) rules.index.local = 0;
  rules.media = "tv";
  rules.criteria = {
    noPerson: false,
    genre: { include: [], exclude: [10767, 10763, 10764] },
  };
  search
    .tvByWords(words, stPage, rules)
    .then(({ error, data }) => (error ? resError(res, data) : res.send(data)));
};

exports.personByWords = (req, res) => {
  const tmdbIndex = Number(req.query["tmdb_index"]);
  const amount = Number(req.query["amount"]);
  const page = Number(req.query["on_page"]);
  const words = req.query["by_words"];

  let { stPage, rules } = initRules(amount, page, tmdbIndex, true);

  if (rules.index.tmdb) rules.index.local = 0;
  rules.media = "person";
  rules.criteria = null;

  search
    .personByWords(words, stPage, rules)
    .then(({ error, data }) => (error ? resError(res, data) : res.send(data)));
};
