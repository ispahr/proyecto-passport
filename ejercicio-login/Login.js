const express = require('express');
const cors = require('cors')
const port = 3000;
const passport = require('passport');
const public_routes = require('./routes/public');
const auth_routes = require('./routes/auth');
const payments_routes = require('./routes/payments');
require('./services');

const app = express();
// Add headers before the routes are defined
app.use(cors());

// Initializes passport and passport sessions
app.use(passport.initialize());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(public_routes);
app.use(auth_routes);
app.use(payments_routes);

// Add headers before the routes are defined
app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

//Nuevo usuario
app.post('/newuser', (req, res) => {
    
    const name = req.body.email;
    const mail = req.body.nombre_y_apellido;
    const pass = req.body.pass;
    const cPass = req.body.confirm_pass;


    let data = {
        'success': true,
        'message': `User ${req.body.nombre_y_apellido} registered correctly`,
        'data': req.body
      }
      res.json(data);
})

//Login
app.post('/login', (req, res) => {
    console.log(req.body)
    res.sendStatus(200)

})

app.get('/productos', (req, res) => {
    console.log('as')
    res.json({'data':'estos son los productos'})

})

//Servidor config
const PORT = 3000;
app.set('port', PORT);

//Levantando servidor
app.listen(PORT, () => {
    console.log(`Servidor ${app.get('port')} funcionando`)

})