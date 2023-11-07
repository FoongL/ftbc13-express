const bcrypt = require('bcrypt')


const basicAuth = (users) => async (req, res, next) => {
  // check for authentication details
  // if it passes, allow the request to continue
  // if it fails, send failed response

  const authData = req.headers.authorization.split(" ")[1];
  console.log("inside middleware:", authData);
  const [email, password] = Buffer.from(authData, "base64")
    .toString()
    .split(":");
  console.log("buffered Data:", email, password);
// doing the exact same thing we did in sign in
  const user = await users.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ success: false, msg: "user not found" });
  }
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) {
    return res
      .status(403)
      .json({ success: false, msg: "password does not match" });
  }



  // all the steps have been passed
  req.userId = user.id


  next();
};

module.exports = basicAuth;
