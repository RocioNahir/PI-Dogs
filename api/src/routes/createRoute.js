const { Router } = require('express');
const { createDog } = require('../controllers/createController')

const router = Router();

router.post("/", createDog);


module.exports = router;