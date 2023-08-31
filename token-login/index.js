const TokenLoginService = require("./token-login.service");

const router = require("express").Router();

/**
 * @function - ONLY ACCESS-TOKEN
 */
router.post("/login1", async (req, res) => {
  const { userid, userpw } = req.body;

  const user = await TokenLoginService.checkUser(userid, userpw);
  const payload = { userid: user.userid, username: user.username };
  const accessToken = TokenLoginService.getToken(payload, "1m");
  console.log(accessToken);
  res.send({ accessToken: accessToken });
});

/**
 * this logic is ok applied middleware
 */
router.post("/verify", (req, res) => {
  const accessToken = req.headers.authorization;
  const result = TokenLoginService.verifyToken(accessToken);
  console.log(result);
  if (result.state == "ok") {
    req.userid = result.decode.userid;
    req.username = result.decode.username;

    console.log(req.userid, req.username);
    res.send({ msg: "verify succeed" });
  }
});

router.post("/token/logout", (req, res) => {});
module.exports = router;
