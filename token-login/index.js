const { client } = require("../config/redis-config");
const TokenLoginService = require("./token-login.service");

const router = require("express").Router();

/**
 * @function - ONLY ACCESS-TOKEN
 */
router.post("/login1", async (req, res) => {
  const { userid, userpw } = req.body;

  const user = await TokenLoginService.checkUser(userid, userpw);
  const payload = { userid: user.userid, username: user.username };
  const accessToken = TokenLoginService.getToken(payload, "50s");
  console.log(accessToken);
  res.send({ accessToken: accessToken });
});

/**
 * @function - BOTH ACCESS-TOKEN and REFRESH-TOKEN
 */
router.post("/login2", async (req, res) => {
  const { userid, userpw } = req.body;

  const user = await TokenLoginService.checkUser(userid, userpw);
  const payload = { userid: user.userid, username: user.username };
  const accessToken = TokenLoginService.getToken(payload, "50s");
  const refreshToken = TokenLoginService.getRefreshToken(payload, "1h");
  const key = `refresh_token:${user.userid}`;
  await client.set(key, refreshToken);
  await client.expire(key, 3600);
  req.userid = user.userid;
  req.username = user.username;

  res.send({ accessToken: accessToken, refreshToken: refreshToken });
});

/**
 * this logic is ok applied middleware
 * access-token & refresh-token and access-token use
 */
router.post("/verify", (req, res) => {
  try {
    if (req.headers.authorization.split(" ")[0] !== "Bearer") throw err;
    const accessToken = req.headers.authorization.split(" ")[1];
    console.log(accessToken);
    const result = TokenLoginService.verifyToken(accessToken);
    console.log(result);
    if (result.state == "ok") {
      req.userid = result.decode.userid;
      req.username = result.decode.username;

      console.log(req.userid, req.username);
      res.send({ msg: "verify succeed" });
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "invalid token" });
  }
});

router.post("/refresh", async (req, res) => {
  const refreshToken = req.headers.authorization.split(" ")[1];

  console.log(1, refreshToken);
  const result = TokenLoginService.verifyRefreshToken(refreshToken);
  console.log(result);
  if (result.state == "ok") {
    const payload = {
      userid: result.decode.userid,
      username: result.decode.username,
    };
    const key = `refresh_token:${payload.userid}`;

    if ((await client.get(key)) === refreshToken) {
      console.log("a");
      const accessToken = TokenLoginService.getToken(payload, "50s");
      res.send({
        msg: "refresh succeed",
        accessToken: accessToken,
      });
    }
  }
});

router.post("/logout", async (req, res) => {
  try {
    const refreshToken = req.headers.authorization.split(" ")[1];
    const result = TokenLoginService.verifyRefreshToken(refreshToken);
    console.log(result);
    if (result.state == "ok") {
      const key = `refresh_token:${result.decode.userid}`;
      console.log(key);
      await client.del(key);
    }
    res.send({ msg: "delete good" });
  } catch (err) {
    throw err;
  }
});
module.exports = router;
