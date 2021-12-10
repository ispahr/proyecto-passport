const express = require('express');
const passport = require('passport');
const router = express.Router();
const STRATEGY_NAME = 'github';


const cors = require('cors')
const bodyParser = require('body-parser')

// const cookieSession = require('cookie-session')

router.use(cors())

// router.use(cookieSession({
//     name: 'tuto-session',
//     keys: ['key1', 'key2']
// }))


const isLoggedIn = (req, res, next) => {
    console.log("Middle log in");
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}


router.use(passport.initialize());
router.use(passport.session());

router.get("/good",  (req, res) => { res.send("Salio bien para github") })

router.get("/login", (req, res) => { res.send("logueate") })

router.get('/auth/github',
    passport.authenticate(STRATEGY_NAME, { scope: [ 'user:email' ] , prompt:"consent" , session:false}) 
);

router.get('/auth/github/callback', passport.authenticate(STRATEGY_NAME, { failureRedirect: '/login', session:false}),
    function (req, res) {
        const token = "eyJhbGciOhsdhjkfljflkasjdflaskdflasdjkiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

        const url_front = `http://localhost:5000/?token=${token}`;
        const github_data = req.user;
        console.log(github_data);


        res.redirect(301, url_front);

    }
);


module.exports = router;