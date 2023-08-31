const { conn } = require("../config/mysql-config");

const cookieAuthMiddleware = (req, res, next) => {
  if (req.cookies.user) return next();
  res.json({ msg: "no auth" });
};

const deserializeSession = (req, res, next) => {
  if (req.session.user) {
    conn.query(
      `select * from user where userid = '${req.session.user}'`,
      (err, result) => {
        if (result.length != 0) {
          req.user = result[0];
          next();
        }
      }
    );
  } else {
    res.send({ msg: "fail" });
  }
};
module.exports = { cookieAuthMiddleware, deserializeSession };
