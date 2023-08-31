const jwt = require("jsonwebtoken");
const { conn } = require("../config/mysql-config");
const secret = "exam_secret";
const refresh_secret = "exam_secret2";
module.exports = class TokenLoginService {
  static checkUser(userid, userpw) {
    return new Promise((resolve, reject) => {
      conn.query(
        `select * from user where userid = '${userid}' and userpw = '${userpw}'`,
        (err, result) => {
          console.log(result.length);
          if (result.length != 0) return resolve(result[0]);
        }
      );
    });
  }
  static getToken(payload, expir) {
    return jwt.sign(payload, secret, {
      algorithm: "HS256",
      expiresIn: expir,
    });
  }
  static getRefreshToken(payload, expir) {
    return jwt.sign(payload, refresh_secret, {
      algorithm: "HS256",
      expiresIn: expir,
    });
  }
  static verifyToken(token) {
    return {
      state: "ok",
      decode: jwt.verify(token, secret, {
        algorithm: "HS256",
      }),
    };
  }
  static verifyRefreshToken(token) {
    return {
      state: "ok",
      decode: jwt.verify(token, refresh_secret, {
        algorithm: "HS256",
      }),
    };
  }
};
