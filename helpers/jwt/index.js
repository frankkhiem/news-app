const jwt = require("jsonwebtoken");

const accessTokenSecret = () => {
  return process.env.ACCESS_TOKEN_SECRET_KEY || 'few8ukjgwrh2@#4hof';
};

const refreshTokenSecret = () => {
  return process.env.REFRESH_TOKEN_SECRET_KEY || 'rgihdI4902#$FsfjJfljajLJFewf34aGk';
}

const generateAccessToken = (data) => {
  return jwt.sign(
    data,
    accessTokenSecret(),
    {
      expiresIn: '1d'
    }
  );
};

const generateRefreshToken = (data) => {
  return jwt.sign(
    data,
    refreshTokenSecret(),
    {
      expiresIn: '30d'
    }
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, accessTokenSecret());
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, refreshTokenSecret());
};

const decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
};
