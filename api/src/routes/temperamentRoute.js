const { Router } = require('express');
const router = Router();
const { allTemperamentApi } = require('../controllers/temperamentController.js')

router.get('/', allTemperamentApi);


module.exports = router;