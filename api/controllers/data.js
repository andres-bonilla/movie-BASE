const data = require("../services/data");
const { resError } = require("./helpers/utils");

exports.topLists = (req, res) => {
  data
    .topLists()
    .then(({ error, data }) => (error ? resError(res, data) : res.send(data)));
};

exports.imgData = (req, res) => {
  data
    .imgData()
    .then(({ error, data }) => (error ? resError(res, data) : res.send(data)));
};
