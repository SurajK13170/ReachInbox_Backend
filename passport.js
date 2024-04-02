const passport = require("passport");
const { User } = require("./models/Google.User.Model");
const { outlookUser } = require("./models/Outlook.User.model");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const OutlookStrategy = require('passport-outlook').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.ClientID,
      clientSecret: process.env.ClientSecret,
      callbackURL: "https://impossible-wig-dog.cyclic.app/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Google Profile:", profile);
      profile.tokens = { accessToken, refreshToken };
      try{
        const user = User.create({
          googleId:profile.id,
          displayName:profile.displayName,
          email:profile.emails.value,
          refreshToken:refreshToken,
          accessToken:accessToken
        })
        console.log(user)
      }catch(err){
        throw err
      }
      return done(null, profile);
    }
  )
);

passport.use(new OutlookStrategy({
  clientID: process.env.ClientID_Outlook,
  clientSecret: process.env.ClientSecret_Outlook,
  callbackURL: "https://impossible-wig-dog.cyclic.app/auth/outlook/callback",
  passReqToCallback: true
},
(accessToken, refreshToken, profile, done) => {
  console.log("Google Profile:", profile);
  profile.tokens = { accessToken, refreshToken };
 
  return done(null, profile);
}
)
);

module.exports = passport;
