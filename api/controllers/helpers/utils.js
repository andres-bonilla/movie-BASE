exports.resError = (res, { status, message }) => {
  const statusCode = status || 500;
  let customMessage = message || "An unexpected error occurred.";

  if (status === 400) {
    customMessage = "Invalid parameters.";
  } else if (status === 404) {
    customMessage = "Page not found.";
  } else if (status === 500) {
    customMessage = "Internal server error.";
  }

  res.status(statusCode).send({
    message: customMessage,
    response: {
      status: statusCode,
    },
  });
};

exports.initRules = (amount, page, tmdbIndex, sameIndex = false) => {
  let prevIndex;

  if (sameIndex)
    prevIndex = page < 0 ? Math.abs(page) * amount + 1 : (page - 1) * amount;
  else prevIndex = tmdbIndex;

  if (page < 0 && !prevIndex) page = Math.abs(page);

  const fitter = page < 0 ? -1 : 1;
  const stPage = fitter * Math.ceil((prevIndex + fitter) / 20) || -1;
  const index = {};
  index.init = (Math.abs(stPage) - 1) * 20 + 1;
  index.tmdb = prevIndex;
  index.local = page < 0 ? Math.abs(page) * amount + 1 : (page - 1) * amount;

  return { stPage, rules: { index, fitter, amount } };
};
