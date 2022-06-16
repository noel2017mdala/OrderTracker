const admin = require("../Configs/config");

const AuthMiddleware = async (req, res, next) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization.replace("Bearer ", "");
    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        if (decodedToken.uid) {
          res.status(200);
          return next();
        } else {
          res.status(400).json({
            message: "user not authenticated",
          });
        }
      });
  } else {
    res.status(400).json({
      message: "user not authenticated",
    });
  }
};

module.exports = AuthMiddleware;
