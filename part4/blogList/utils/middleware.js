const jwt = require("jsonwebtoken");

const errorHandler = (error, request, response, next) => {
  console.log(error.name);
  if (error.name === "ValidationError") {
    response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    response.status(401).json({ error: "invalid token" });
  }

  next(error);
};
const tokenExtractor = (request, response, next) => {
  /* Add token to the request object*/
  let authorization = request.get("authorization");
  // remove bearer string and return only token
  if (authorization && authorization.startsWith("Bearer")) {
    authorization = authorization.replace("Bearer ", "");
  }
  let bearerToken = authorization ? authorization : null;
  request.token = bearerToken;
  next();
};
const userExtractor = (request, response, next) => {
  const bearerToken = request.token;
  if (bearerToken) {
    const decodeToken = jwt.verify(bearerToken, process.env.SECRET);
    if (!decodeToken.id) {
      return response.status(401).response({ error: "token invalid" });
    }
    request.user = decodeToken.id;
  }
  next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
