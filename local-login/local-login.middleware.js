const cookieAuthMiddleware = (req, res, next) => {
  if (req.cookies.user) return next();
  res.json({ msg: "no auth" });
};

module.exports = { cookieAuthMiddleware };
