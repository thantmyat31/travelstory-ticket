const {check} = require("express-validator");

exports.creatExpressAgencyValidator = [
    check('owner')
        .not()
        .isEmpty()
        .withMessage('Owner field should not be empty.'),
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name field should not be empty.'),
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address.'),
    check('phones')
        .not()    
        .isEmpty()
        .withMessage('At least one phone number is required.')
        .custom(async (phones, {req}) => { 
            if(!phones.length){ 
                throw new Error('At least one phone number is required.') 
            } 
        }),
    check('addresses')
        .not()
        .isEmpty()
        .withMessage('At least one office address is required.')
        .custom(async (addresses, {req}) => { 
            if(!addresses.length){ 
                throw new Error('At least one office address is required.') 
            } 
        })
]