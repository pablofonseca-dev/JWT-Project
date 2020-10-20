const {Router} = require('express');
const mainController = require('../controllers/mainController');
const router = Router(); 

router.get('/', (request, response) => mainController.home_get(request, response));

module.exports = router; 