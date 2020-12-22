const express = require("express");
const router = express.Router();

const { createExchangeRate, updateExchangeRate, getExchangeRate } = require("../controllers/exchange");
const { requireSignin, adminMiddleware } = require("../middlewares/user");
const { createExchangeRateValidator, updateExchangeRateValidator } = require("./../validators/exchange");
const { runValidation } = require("./../validators");

router.get('/', getExchangeRate);
router.post('/create', createExchangeRateValidator, runValidation, requireSignin, adminMiddleware, createExchangeRate);
router.put('/update', updateExchangeRateValidator, runValidation, requireSignin, adminMiddleware, updateExchangeRate);

module.exports = router;