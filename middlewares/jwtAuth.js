const jwt = require('jsonwebtoken')

const jwtAuth = (req, res, next) => {
  console.log("HEADERS:", req.headers);
  const token = req.headers.authorization.split(" ")[1];
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("verified token:", verifiedToken);
    req.userId = verifiedToken.id
    next();
  } catch (err) {
    console.log('error:', err)
    return res.status(403).json({ success: false, msg: "invalid token", err });
  }
};

module.exports = jwtAuth;
