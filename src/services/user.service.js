const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const { db } = require("../models");
const { pagination } = require("../utils");
const { securePassword } = require("../utils/string.utils");
const { User, Media } = db;

/**
 * Get Users
 * @param {*} sortBy
 * @param {*} page
 * @param {*} limit
 * @returns
 */
const getUsers = async (sortBy = "firstName", page = 1, limit = 10) => {
  return await pagination(User, {}, [{ model: Media, as: "media" }], sortBy, "ASC", page, limit);
};

/**
 * Create User
 * @param {*} userBody
 * @param {*} file
 * @returns
 */
const createUser = async (userBody, file = null) => {
  if (file) {
    const media = await Media.create({
      name: file.filename,
      type: "image",
      size: file.size,
      mimeType: file.mimetype,
      url: `${process.env.BASE_URL}/${file.filename}`,
    });
    userBody.mediaId = media.id;
  }

  const checkUser = await checkUserExist(userBody.email);
  if (checkUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }

  userBody.password = await securePassword(userBody.password);
  const user = await User.create(userBody);
  return user;
};

/**
 * Update User
 * @param {*} userId
 * @param {*} userBody
 * @param {*} file
 * @returns
 */
const updateUser = async (userId, userBody, file = null) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (file) {
    const media = await Media.create({
      name: file.filename,
      type: "image",
      size: file.size,
      mimeType: file.mimetype,
      url: `${process.env.BASE_URL}/${file.filename}`,
    });
    userBody.mediaId = media.id;
  }

  Object.assign(user, userBody);
  await user.save();
  return user;
};

/**
 * Delete User
 * @param {*} userId
 */
const deleteUser = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  await user.destroy();
};

/**
 * Check User Exist
 * @param {*} email
 * @returns
 */
const checkUserExist = async (email) => {
  return await User.findOne({ where: { email } });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,

  checkUserExist,
};
