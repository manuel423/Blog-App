const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../../config/env").JWT_SECRET;

const getUser = (req) => {
  const bearerHeader = req.headers["authorization"];
  const bearer = bearerHeader.split(" ");
  const token = bearer[1];
  var decode = jwt.decode(token);

  console.log("in side user fun");
  console.log(bearerHeader);
  return decode;
};
const checkAuthorPermission = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  console.log(bearerHeader);
  if (!bearerHeader) {
    return res.status(403).json({
      success: false,
      message: "You have to login first!",
    });
  }
  const bearer = bearerHeader.split(" ");
  const token = bearer[1];
  var decode = jwt.decode(token);
  console.log(decode);
  if (decode.user.role === "author") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Unauthorized access, You have to be an Author",
    });
  }
};
const checkUserPermission = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(403).json({
      success: false,
      message: "You have to login first!",
    });
  }
  const bearer = bearerHeader.split(" ");
  const token = bearer[1];
  var decode = jwt.decode(token);
  //console.log("*******");
  //console.log(decode.permissions[0]);
  //console.log("*******");

  if (decode.user.role === "user") {
    next();
  } else {
    return res.status(403).send({
      success: false,
      message: "Unauthorized, You have to be a user to comment.",
    });
  }
};

const validateToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    jwt.verify(token, JWT_SECRET, async (err, authData) => {
      if (err) {
        //console.log("Invalid Token 1")

        res.status(403).send({
          success: false,
          message: err,
        });
      } else {
        //console.log("Token Valid")
        next();
      }
    });
  } else {
    //console.log("Invalid Token")
    res.status(403).send({
      success: false,
      message: "You have to login first!",
    });
  }
};

module.exports = {
  getUser,
  validateToken,
  checkAuthorPermission,
  checkUserPermission,
};
