require('dotenv').config();
const jwt = require('jsonwebtoken');

/**
 * Function that generates jwt token for users
 * @param  {object} user user object with required attributes
 * @returns {string} token
 */
const genAuthToken = (user) => {
  // get key from env-file
  const secretKey = process.env.JWT_SECRET_KEY;

  // generate jwt token with provided user and key
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    secretKey
  );
  return token;
};

module.exports = genAuthToken;
