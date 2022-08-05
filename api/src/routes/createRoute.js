const { Router } = require('express');
const { createDog } = require('../controllers/createController')

const router = Router();

console.log('pasa por aqui')
router.post("/", createDog);


module.exports = router;