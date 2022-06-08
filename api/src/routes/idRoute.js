const { Router } = require('express');
const { getIdDogs } = require('../controllers/idController');

const router = Router();

router.use("/", getIdDogs);


module.exports = router;
