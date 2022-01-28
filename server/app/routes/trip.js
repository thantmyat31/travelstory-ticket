const express = require("express");
const { createTrip, getAllTrips, getTripsByAgency, updateSeats, deleteTrip } = require("../controllers/trip");
const { requireSignin, agencyMiddleware } = require("../middlewares/user");
const { createTripValidator } = require("../validators/trip");
const { runValidation } = require("../validators");
const router = express.Router();

router.get('/', getAllTrips);
router.get('/:id', requireSignin, agencyMiddleware, getTripsByAgency);
router.post('/create', requireSignin, agencyMiddleware, createTripValidator, runValidation, createTrip);
router.delete('/:id', requireSignin, agencyMiddleware, deleteTrip);
router.put('/:id', updateSeats);

module.exports = router;