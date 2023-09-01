const passport = require("passport");
const { google } = require("./oauth-login.middleware");

const router = require("express").Router();

passport.use("google", google);

router.get(
  "/google/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/login/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3001/",
  }),
  (req, res) => {
    res.redirect("http://localhost:3001/main");
  }
);

router.get("/profile", (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.send("login succeed");
  } else {
    res.send("login fail").status(403);
  }
});
router.get("/google/logout", (req, res) => {
  req.logOut((err) => {
    if (!err) res.send("good");
  });
});
passport.serializeUser((user, done) => {
  console.log("serialize User", user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log("deserialize User");
  done(null, user);
});
module.exports = router;
