const express = require("express");
const { checkoutPayment, checkCompleteToken } = require("../controllers/ticket");
const { buyTicketValidator } = require("../validators/ticket");
const { runValidation } = require("../validators");
const router = express.Router();

router.post('/payment', buyTicketValidator, runValidation, checkoutPayment);
router.post('/check-token', checkCompleteToken);

module.exports = router;