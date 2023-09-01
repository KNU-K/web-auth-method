const passport = require("passport");
const { google, naver, kakao } = require("./oauth-login.middleware");

const router = require("express").Router();
/**
 * @middleware
 */
passport.use("google", google);
passport.use("naver", naver);
passport.use("kakao", kakao);

/**
 * @GoogleStrategy
 */
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

/**
 * @KakaoStrategy
 */
router.get("/kakao/login", passport.authenticate("kakao"));

router.get(
  "/kakao/login/callback",
  passport.authenticate("kakao", {
    failureRedirect: "http://localhost:3001/",
  }),
  (req, res) => {
    res.redirect("http://localhost:3001/main");
  }
);

/**
 * @NaverStrategy
 */
router.get("/naver/login", passport.authenticate("naver"));

router.get(
  "/naver/login/callback",
  passport.authenticate("naver", {
    failureRedirect: "http://localhost:3001/",
  }),
  (req, res) => {
    res.redirect("http://localhost:3001/main");
  }
);
router.get("/logout", (req, res) => {
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
