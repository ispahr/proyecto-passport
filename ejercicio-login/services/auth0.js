const passport = require('passport');
const Auth0Strategy  = require('passport-auth0').Strategy;
require('dotenv').config()

const strategy_name = 'auth0';

passport.use(strategy_name, new Auth0Strategy ({
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL_AUTH0,
    state:false,
    domain: process.env.AUTH0_DOMAIN,
  },
  function(accessToken, refreshToken, profile, done) {
    
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return done(null, profile);



  }
));