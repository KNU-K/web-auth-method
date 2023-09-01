const GoogleStrategy = require("passport-google-oauth20").Strategy;
const NaverStrategy = require("passport-naver").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;
const dotenv = require("dotenv").config();
//원래는 바로 done 하는게 아니라 db 내에 저장해준다. 서비스에 대한 가입
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
  naver: new NaverStrategy(
    {
      clientID: process.env.NaverClientID,
      clientSecret: process.env.NaverClientSecret,
      callbackURL: "http://localhost:8000/oauth/naver/login/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, {
        email: profile._json.email,
        nick: profile._json.email,
      });
    }
  ),
  kakao: new KakaoStrategy(
    {
      clientID: process.env.KakaoClientID,
      callbackURL: "http://localhost:8000/oauth/kakao/login/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, {
        email: profile._json.email,
        nick: profile._json.email,
      });
    }
  ),
};
