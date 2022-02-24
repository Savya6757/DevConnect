const jwt = require("jsonwebtoken");
const secret = process.env.JWT_TOKEN_SECRET;

module.exports.auth = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Authorisation failed, access denied" });
  }

  try {
    // const decode = jwt.verify(token, secret);

    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "Token is not valid" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
    // req.user = decode.user;
    // next();
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ msg: "server error" });
  }
};
