const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').config()

const strategy_name = 'github';

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL_GITHUB
  },
  function(accessToken, refreshToken, profile, done) {
    
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return done(null, profile);



  }
));