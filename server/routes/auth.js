const router = require('express').Router();

const { register, accountActivation, login, isTokenValid } = require("./../controllers/auth");

// check token was expired or valid
router.post('/', isTokenValid);

router.post('/register', register);
router.post('/account-activation', accountActivation);
router.post('/login', login);

module.exports = router;
