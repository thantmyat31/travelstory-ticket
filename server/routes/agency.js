const express = require("express");
const router = express.Router();

const { requireSignin, agencyMiddleware } = require("../middlewares/user");
const { uploadImage, createAgency, getOwnAgency } = require("../controllers/agency");
const { creatExpressAgencyValidator } = require("../validators/express_agency");
const { runValidation } = require("../validators");


router.get('/:ownerId', requireSignin, agencyMiddleware, getOwnAgency);
router.post('/upload', requireSignin, agencyMiddleware, uploadImage);
router.post('/create', requireSignin, agencyMiddleware, creatExpressAgencyValidator, runValidation, createAgency);

module.exports = router;