const {check} = require("express-validator");

exports.buyTicketValidator = [
    check('tripId')
        .not()
        .isEmpty()
        .withMessage('Trip field should not be empty.'),
    check('selectedSeats')
        .not()
        .isEmpty()
        .withMessage('Need to select at least one seat.')
        .custom(async (selectedSeats, {req}) => { 
            if(!selectedSeats.length){ 
                throw new Error('At least one seat number is required.') 
            } 
        }),
    check('nationality')
        .not()
        .isEmpty()
        .withMessage('Need to select at least one nationality.'),
    check('contactInfo')
        .custom(async (contactInfo, {req}) => { 
            if(contactInfo.name === '' || contactInfo.gender === '' || contactInfo.phone === ''){ 
                throw new Error('You need to insert all fields with red astris.') 
            } 
        }),
    check('amount')
        .not()
        .isEmpty()
        .withMessage('Amount field is not allowed as empty'),
    check('price')
        .not()
        .isEmpty()
        .withMessage('Price field is not allowed as empty')
]