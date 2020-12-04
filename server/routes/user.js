const express = require("express");
const router = express.Router();

const { getUserById, deleteUser, getAllUsers, updateRole } = require("../controllers/user");
const { requireSignin, adminMiddleware } = require('./../middlewares/user');

router.get('/all', requireSignin, adminMiddleware, getAllUsers);
router.put('/:id', requireSignin, adminMiddleware, updateRole);
router.delete('/delete', requireSignin, adminMiddleware, deleteUser);

router.get('/:id', requireSignin, getUserById);


module.exports = router;