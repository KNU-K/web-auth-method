const { conn } = require("../config/mysql-config");

module.exports = class LocalLoginService {
  static login(userid, userpw) {
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
};
