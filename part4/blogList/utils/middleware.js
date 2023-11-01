const errorHandler = (error, request, response, next) => {
  console.log(error.name);
  if (error.name === "ValidationError") {
    response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    response.status(401).json({ error: "jwt token invalid" });
  }

  next(error);
};

module.exports = errorHandler;
