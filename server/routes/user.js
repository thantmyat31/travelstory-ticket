const express = require("express");
const router = express.Router();

const { getUserById, deleteUser, getAllUsers, updateRole } = require("../controllers/user");
const { requireSignin, adminMiddleware } = require('./../middlewares/user');

router.get('/all', requireSignin, adminMiddleware, getAllUsers);
router.put('/:id', requireSignin, adminMiddleware, updateRole);
router.get('/:id', requireSignin, getUserById);

router.delete('/delete', requireSignin, deleteUser);

module.exports = router;