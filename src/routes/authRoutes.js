const {Router} = require('express');
const authController = require('../controllers/authController');

const router = Router(); 

router.get('/signup', ((request, response) => {
    authController.signup_get(request, response);
}));

router.post('/signup', ((request, response) => {
    authController.signup_post(request, response); 
}));

router.get('/login', ((request, response) => {
    authController.login_get(request, response); 
}));

router.post('/login', ((request, response) => {
    authController.login_post(request, response); 
}));

module.exports = router; 
