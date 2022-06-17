const admin = require("../Configs/config");

const AuthMiddleware = async (req, res, next) => {
  let authHeader = req.headers["authorization"];

  if (authHeader) {
    let token = req.headers["authorization"].replace("Bearer ", "");
    if (token) {
      let response = await admin.auth().verifyIdToken(token);
      if (response && response.uid) {
        next();
      } else {
        res.status(401).json({
          message: "user not authenticated",
        });
      }
    }
  } else {
    res.status(401).json({
      message: "user not authenticated",
    });
  }
};
module.exports = AuthMiddleware;
