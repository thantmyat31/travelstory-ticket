const express = require("express");
const router = express.Router();

const { requireSignin, agencyMiddleware } = require("../middlewares/user");
const { createAgency } = require("../controllers/agency");
const { creatExpressAgencyValidator } = require("../validators/express_agency");
const { runValidation } = require("../validators");

router.post('/create', requireSignin, agencyMiddleware, creatExpressAgencyValidator, runValidation,createAgency);

module.exports = router;