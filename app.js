const express = require("express");
const { conn } = require("./config/mysql-config");
const app = express();

const local = require("./local-login/index");
const oauth = require("./oauth-login/index");
const OIDC = require("./OIDC-login/index");
const token = require("./token-login/index");
const cookieParser = require("cookie-parser");
const port = 6666;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/local", local);
app.use("/oauth", oauth);
app.use("/OIDC", OIDC);
app.use("/token", token);
app.listen(port, async () => {
  try {
    await conn.connect();
    console.log("db conn succeed .. !");
    console.log("WEB AUTH METHOD SIMPLE TEST");
  } catch (err) {
    throw err;
  }
});
