const person = require("../services/person");
const { resError } = require("./helpers/utils");

exports.getById = (req, res) => {
  person
    .getById(req.params.id)
    .then(({ error, data }) => (error ? resError(res, data) : res.send(data)));
};
