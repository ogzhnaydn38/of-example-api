const crypto = require("crypto");
const encode = require("hi-base32");
const jwt = require("jsonwebtoken");

/**
 * Secure password
 * @param {string} password
 * @returns {Promise<string>}
 */
const securePassword = async (password) => {
  const sha256 = async (password) => {
    const hash = crypto.createHash("sha256");
    hash.update(password);
    return hash.digest("hex");
  };
  return await sha256(password);
};

/**
 * Check if password match
 * @param {string} password
 * @param {string} hashedPassword
 * @returns {Promise<boolean>}
 */
const isPasswordMatch = async (password, hashedPassword) => {
  return (await securePassword(password)) === hashedPassword;
};

/**
 * Generate secure code
 * @param {number} length
 * @returns {string}
 */
const generateSecureCode = (length) => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    const random = Math.floor(Math.random() * charset.length);
    code += charset[random];
  }
  return code;
};

/**
 * Generate token
 * @param {object} payload
 * @param {string} expiresIn
 * @returns {string}
 */
const generateToken = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
    issuer: "tchat.service",
  });
};

/**
 * Decode token
 * @param {string} token
 * @returns {object}
 */
const decodeToken = async (token) => {
  try {
    return await jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

/**
 * Generate base32 secret
 * @returns {string}
 */
const generateBase32Secret = (size = 15) => {
  const buffer = crypto.randomBytes(size);
  const base32 = encode.encode(buffer);
  return base32;
};

/**
 * Generate media type
 * @param {string} mimetype
 * @returns {string}
 */
const generateMediaType = (mimetype) => {
  let type = "other";
  if (
    mimetype.includes("image") ||
    mimetype.includes("png") ||
    mimetype.includes("jpeg") ||
    mimetype.includes("jpg")
  ) {
    type = "image";
  } else if (mimetype.includes("video")) {
    type = "video";
  } else if (mimetype.includes("audio")) {
    type = "audio";
  } else if (
    mimetype.includes("document") ||
    mimetype.includes("pdf") ||
    mimetype.includes("msword") ||
    mimetype.includes("excel") ||
    mimetype.includes("sheet") ||
    mimetype.includes("text")
  ) {
    type = "document";
  }
  return type;
};

module.exports = {
  generateSecureCode,
  securePassword,
  isPasswordMatch,
  generateToken,
  decodeToken,
  generateBase32Secret,
  generateMediaType,
};
