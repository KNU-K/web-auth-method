const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv").config();
module.exports = {
  google: new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: "http://localhost:8000/oauth/google/login/callback",
      scope: ["profile", "email"],
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, {
        email: profile.emails[0].value,
        nick: profile.displayName,
        snsid: profile.id,
        provider: "google",
      });
    }
  ),
};
