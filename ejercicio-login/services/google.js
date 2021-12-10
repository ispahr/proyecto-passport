var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const dotenv = require("dotenv").config()

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

const GOOGLE_CLIENT_ID =  process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const callbackURL = process.env.CALLBACK_URL_GOOGLE

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: callbackURL
},
function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
}
));