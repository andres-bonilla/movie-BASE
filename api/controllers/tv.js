const tv = require("../services/tv");
const { resError } = require("./helpers/utils");

exports.getById = (req, res) => {
  tv.getById(req.params.id).then(({ error, data }) =>
    error ? resError(res, data) : res.send(data)
  );
};
