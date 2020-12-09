const express = require("express");
const { getAllCities, addNewCity, deleteCityById } = require("../controllers/city");
const { requireSignin, adminMiddleware } = require("../middlewares/user");
const router = express.Router();

router.get('/', getAllCities);
router.post('/create', requireSignin, adminMiddleware, addNewCity);
router.delete('/:id', requireSignin, adminMiddleware, deleteCityById);

module.exports = router;