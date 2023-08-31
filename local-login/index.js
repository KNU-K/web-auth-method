const { conn } = require("../config/mysql-config");
const {
  cookieAuthMiddleware,
  deserializeSession,
} = require("./local-login.middleware");
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

/**
 *
 * @handler - using session
 */
router.post("/login/session", async (req, res) => {
  const { userid, userpw } = req.body;
  const user = await LocalLoginService.sessionLogin(userid, userpw);
  req.session.user = user.userid;
  res.json({
    msg: "login successful .. !",
  });
});
router.post("/auth/session", deserializeSession, async (req, res) => {
  console.log(req.user);
  res.json({ msg: "good" });
});

router.post("/logout/session", (req, res, next) => {
  req.user = undefined;
  req.session.destroy((err) => {
    if (!err) {
      res.json({ msg: "logout good" });
    }
  });
});

module.exports = router;
