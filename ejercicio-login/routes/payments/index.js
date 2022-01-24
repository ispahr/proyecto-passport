const express = require('express');
const router = express.Router();
require('dotenv').config();
// const mercadopago = require ('./mercadopago');
const paypal = require ('./paypal.js')

//Este endpoint es de prueba nada mas
router.get('/pruebapago', function(req, res) {
    console.log("New request POST to /pruebapago");
    let data = {
      'success': true,
      'message': `Este es un mensaje de prueba`,
      'data': req.body
    }
    res.json(data);
  });
  
// router.use('/mercadopago',mercadopago);
router.use('/paypal', paypal);
module.exports = router
