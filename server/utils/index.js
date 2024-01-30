const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret_key = "njdsjldalsjmadsaoss,dasaso";
// process.env.secret_key ||
const hashPw = (password) => {
  return bcrypt.hashSync(password);
};

const comparePw = (password, hashPw) => {
  return bcrypt.compareSync(password, hashPw);
};

const signToken = (payload) => {
  return jwt.sign(payload, secret_key);
};

const verifyToken = (token) => {
  return jwt.verify(token, secret_key);
};

module.exports = {
  hashPw,
  comparePw,
  signToken,
  verifyToken,
};
