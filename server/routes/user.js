const express = require("express");
const router = express.Router();

const { getUserById, deleteUser } = require("../controllers/user");
const { requireSignin } = require('./../middlewares/user');

router.get('/:id', requireSignin, getUserById);
router.delete('/delete', requireSignin, deleteUser);

module.exports = router;