// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Router } = require('express');
const dogsRoute = require("./dogsRoute");
const temperamentRoute = require('./temperamentRoute');
const createRoute = require('./createRoute');


const router = Router();

router.use('/dogs', dogsRoute);
router.use('/temperament', temperamentRoute);
console.log('LLEGA A LA RUTA CREATE')
router.use('/dog', createRoute);

module.exports = router;


