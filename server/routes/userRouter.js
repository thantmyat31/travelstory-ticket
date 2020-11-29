const router = require('express').Router();

const auth = require('./../middlewares/auth');
const { register, login, deleteUser, isTokenValid, getUserById } = require("./../controllers/auth");

router.post('/register', register);

router.post('/login', login);

router.delete('/delete', auth, deleteUser);

router.post('/isTokenValid', isTokenValid);

router.get('/', auth,  getUserById);

module.exports = router;
