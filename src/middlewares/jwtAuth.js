const jwt = require('jsonwebtoken');
require('dotenv').config();
function jwtAuthorization(req, res, next) {
  const headerAuth = req.headers.authorization;
  // console.log('...........', headerAuth, '11111111');
  const token = headerAuth && headerAuth.split(' ')[1];
  // console.log('.............', token, '..............................');
  if (token == null) {
    res.send('Invalid Token');
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (user == null || err) {
        res.status(404).json({ error: { err } });
      }
      req.user = user;
      console.log('Token Verified');
      next();
    });
  }
}

module.exports = jwtAuthorization;
