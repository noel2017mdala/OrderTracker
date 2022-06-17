const admin = require("../Configs/config");

const AuthMiddleware = async (req, res, next) => {
  let authHeader = req.headers["authorization"];
  console.log(authHeader);

  if (authHeader === undefined) {
    res.status(401).json({
      message: "user not authenticated",
    });
  } else {
    let token = req.headers["authorization"].replace("Bearer ", "");
    console.log('ndafika');
    if (token !== undefined) {
      console.log('tulika');
      try {
        let response = await admin.auth().verifyIdToken(token);
        if (response && response.uid) {
          console.log(`iwe ${response}`);
          next();
        } else {
          res.status(401).json({
            message: "user not authenticated",
          });
        }
      } catch (error) {
        console.log("mavuto");
        console.log(error);
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
