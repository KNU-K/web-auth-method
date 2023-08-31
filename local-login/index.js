const { conn } = require("../config/mysql-config");
const { cookieAuthMiddleware } = require("./local-login.middleware");
const LocalLoginService = require("./local-login.service");

const router = require("express").Router();

/**
 *
 * @handler - using cookie
 */
router.post("/login/cookie", async (req, res) => {
  const { userid, userpw } = req.body;
  const user = await LocalLoginService.cookieLogin(userid, userpw);
  res.cookie("user", user);
  res.json({
    msg: "login successful .. !",
  });
});
router.post("/auth/cookie", cookieAuthMiddleware, async (req, res) => {
  res.json({ msg: "good" });
});

router.post("/logout/cookie", (req, res, next) => {
  res.clearCookie("user");
  res.json({ msg: "logout good" });
});

module.exports = router;
