const admin = require("../Configs/config");

const AuthMiddleware = async (req, res, next) => {
  let authHeader = req.headers["authorization"];
  if (authHeader === undefined) {
    res.status(401).json({
      message: "user not authenticated",
    });
  } else {
    let token = req.headers["authorization"].replace("Bearer ", "");
    if (token !== undefined) {
      try {
        let response = await admin.auth().verifyIdToken(token);
        if (response && response.uid) {
          next();
        } else {
          res.status(401).json({
            message: "user not authenticated",
          });
        }
      } catch (error) {
        res.status(401).json({
          message: "user not authenticated",
        });
      }
    } else {
      res.status(401).json({
        message: "user not authenticated",
      });
    }
  }
};
module.exports = AuthMiddleware;
