const mysql = require("mysql");
const dev_config = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "auth_exam",
};
module.exports = {
  conn: mysql.createConnection(dev_config),
};
