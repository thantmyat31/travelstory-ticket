const {check} = require("express-validator");

exports.createExchangeRateValidator = [
    check('dollarXR')
        .not()
        .isEmpty()
        .withMessage('Dollar ex-rate field is not allowed as empty')
];

exports.updateExchangeRateValidator = [
    check('dollarXR')
        .not()
        .isEmpty()
        .withMessage('Dollar ex-rate field is not allowed as empty')
];