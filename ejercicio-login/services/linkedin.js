var passport = require('passport');
var LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const dotenv = require("dotenv").config()

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

const LINKEDIN_CLIENT_ID =  process.env.LINKEDIN_CLIENT_ID
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET
const callbackURL = process.env.CALLBACK_URL_LINKEDIN

passport.use(new LinkedinStrategy({
    clientID: LINKEDIN_CLIENT_ID,
    clientSecret: LINKEDIN_CLIENT_SECRET,
    callbackURL: callbackURL, 
    scope: ['r_emailaddress', 'r_liteprofile']
},
function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
}
));