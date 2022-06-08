const { Router } = require('express');
const { getAllDogs } = require('../controllers/dogsController');
const { getIdDogs } = require('../controllers/idController');

const router = Router();

router.use('/:id', getIdDogs);
router.use("/", getAllDogs);


module.exports = router;
