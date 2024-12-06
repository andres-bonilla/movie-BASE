const movie = require("../services/movie");
const { resError } = require("./helpers/utils");

exports.getById = (req, res) => {
  movie
    .getById(req.params.id)
    .then(({ error, data }) => (error ? resError(res, data) : res.send(data)));
};
