const { conn } = require("../config/mysql-config");
const LocalLoginService = require("./local-login.service");

const router = require("express").Router();
router.post("/login/cookie", async (req, res) => {
  const { userid, userpw } = req.body;
  const user = await LocalLoginService.login(userid, userpw);
  res.cookie("user", user);
  res.json({
    msg: "login successful .. !",
  });
});

const cookieAuthMiddleware = (req, res, next) => {
  if (req.cookies.user) return next();
  res.json({ msg: "no auth" });
};
router.post("/auth/cookie", cookieAuthMiddleware, async (req, res) => {
  res.json({ msg: "good" });
});

router.post("/logout/cookie", (req, res, next) => {
  res.clearCookie("user");
  res.json({ msg: "logout good" });
});
module.exports = router;
