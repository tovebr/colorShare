require('dotenv').config();
const jwt = require('jsonwebtoken');

const genAuthToken = (user) => {
  const secretKey = process.env.JWT_SECRET_KEY;

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
