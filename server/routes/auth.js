const router = require('express').Router();

const { runValidation } = require('../validators');
const { userSignupValidator, userSigninValidator } = require('../validators/auth');
const { register, accountActivation, login, isTokenValid } = require("./../controllers/auth");

// check token was expired or valid
router.post('/', isTokenValid);
// Auth routes
router.post('/register', userSignupValidator, runValidation, register);
router.post('/account-activation', accountActivation);
router.post('/login', userSigninValidator, runValidation, login);

module.exports = router;
