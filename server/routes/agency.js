const express = require("express");
const router = express.Router();

const { requireSignin, agencyMiddleware } = require("../middlewares/user");
const { createAgency } = require("../controllers/agency");

// router.post('/create', requireSignin, agencyMiddleware, createAgency);

module.exports = router;