const express = require("express");
const { checkoutPayment } = require("../controllers/ticket");
const { buyTicketValidator } = require("../validators/ticket");
const { runValidation } = require("../validators");
const router = express.Router();

router.post('/payment', buyTicketValidator, runValidation, checkoutPayment);

module.exports = router;