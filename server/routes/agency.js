const express = require("express");
const router = express.Router();

const { requireSignin, agencyMiddleware, adminMiddleware } = require("../middlewares/user");
const { uploadImage, createAgency, getOwnAgency, getAllAgencies, getSoldTicketsByTripId } = require("../controllers/agency");
const { creatExpressAgencyValidator } = require("../validators/express_agency");
const { runValidation } = require("../validators");


router.get('/', requireSignin, adminMiddleware, getAllAgencies);
router.get('/:ownerId', requireSignin, agencyMiddleware, getOwnAgency);
router.post('/upload', requireSignin, agencyMiddleware, uploadImage);
router.post('/create', requireSignin, agencyMiddleware, creatExpressAgencyValidator, runValidation, createAgency);
router.get('/ticket/:tripId', requireSignin, agencyMiddleware, getSoldTicketsByTripId);

module.exports = router;