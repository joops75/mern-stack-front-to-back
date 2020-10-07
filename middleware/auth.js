const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: 'No token, authorization denied.' }] });
  }
  jwt.verify(token, config.get('jwtSecret'), (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ errors: [{ msg: `Token is not valid: ${err.message}.` }] });
    }
    req.user = decoded.user;
    next();
  });
};
