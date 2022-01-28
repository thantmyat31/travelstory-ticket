const express = require("express");
const { checkoutPayment, checkCompleteToken, findTicket } = require("../controllers/ticket");
const { buyTicketValidator } = require("../validators/ticket");
const { runValidation } = require("../validators");
const router = express.Router();

router.post('/payment', buyTicketValidator, runValidation, checkoutPayment);
router.post('/check-token', checkCompleteToken);
router.post('/find-ticket', findTicket);

module.exports = router;