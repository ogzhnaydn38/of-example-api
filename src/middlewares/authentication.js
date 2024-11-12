const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { User } = require("../models");

const auth = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
  }
  token = token.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.id);
    if (!user) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
  }
};

module.exports = auth;
