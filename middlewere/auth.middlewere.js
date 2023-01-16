const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.headers.authentication;
  if (token) {
    const decode = jwt.verify(token, "sumit");
    if (decode) {
      const userId = decode.userId;
      req.body.userId = userId;
      next();
    } else {
      res.send("Please login first");
    }
  } else {
    res.send("Please login");
  }
};
module.exports=authentication