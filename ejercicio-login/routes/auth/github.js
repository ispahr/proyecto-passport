const express = require('express');
const passport = require('passport');
const router = express.Router();
const STRATEGY_NAME = 'github';

const cors = require('cors')
const bodyParser = require('body-parser');
const { getCon } = require('../../database/models');
const con = getCon()
const jwt = require('jsonwebtoken')

// const cookieSession = require('cookie-session')

router.use(cors())

// router.use(cookieSession({
//     name: 'tuto-session',
//     keys: ['key1', 'key2']
// }))


router.use(passport.initialize());
router.use(passport.session());

router.get("/good",  (req, res) => { res.send("Salio bien para github") })

router.get("/login", (req, res) => { res.send("logueate") })

router.get('/auth/github',
    passport.authenticate(STRATEGY_NAME, { scope: [ 'user:email' ] , prompt:"consent" , session:false}) 
);

router.get('/auth/github/callback', passport.authenticate(STRATEGY_NAME, { failureRedirect: '/login', session:false}),
    async function (req, res) {
        const githubId = req.user._json.id
        const githubLogin = req.user._json.login
        console.log(githubId);
        console.log(githubLogin);
        
        const data = await con.model('Providers').findOne({where: { strategy_id: githubId }})
        console.log(data);
        if (data === null) {
            var user = await con.model('User').create({username:githubLogin})
            await con.model('Providers').create({strategy_id:githubId, strategy_name:STRATEGY_NAME, UserId:user.id})
            
        } else {
            var user = await con.model('User').findOne({where: { id: data.UserId }})

        }

        
        console.log(user.id);
        const payload = { id: user.id }
        
        const token = jwt.sign(payload,process.env.JWT_PASSWORD, {expiresIn: 1440});
        console.log(token);
        
        const url_front = `http://localhost:5000/?token=${token}`;
        const github_data = req.user;
        // console.log(github_data);
        

        res.redirect(301, url_front);

    }
);


module.exports = router;