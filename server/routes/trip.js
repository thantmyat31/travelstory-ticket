const express = require("express");
const { createTrip, getAllTrips, getTripsByAgency } = require("../controllers/trip");
const { requireSignin, agencyMiddleware } = require("../middlewares/user");
const { createTripValidator } = require("../validators/trip");
const { runValidation } = require("../validators");
const router = express.Router();

router.get('/', getAllTrips);
router.get('/:id', requireSignin, agencyMiddleware, getTripsByAgency);
router.post('/create', requireSignin, agencyMiddleware, createTripValidator, runValidation, createTrip);

module.exports = router;