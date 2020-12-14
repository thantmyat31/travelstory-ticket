const {check} = require("express-validator");

exports.createTripValidator = [
    check('agency')
        .not()
        .isEmpty()
        .withMessage('Agency field should not be empty.'),
    check('tripName')
        .not()
        .isEmpty()
        .withMessage('Trip\'s name field should not be empty.'),
    check('tripCode')
        .not()
        .isEmpty()
        .withMessage('Trip\'s code field should not be empty.'),
    check('trips')
        .not()    
        .isEmpty()
        .withMessage('At least one trip is required.')
        .custom(async (trips, {req}) => { 
            if(!trips.length){ 
                throw new Error('At least one trip is required.') 
            } 
        }),
    check('busType')
        .not()
        .isEmpty()
        .withMessage('You must choose on value for bus type field.'),
    check('seatsList')
        .not()
        .isEmpty()
        .withMessage('At least one set of seats list is required.')
        .custom(async (seatsList, {req}) => { 
            if(seatsList.type === 'vip') { 
                if(seatsList.seats.length !== 30) {
                    throw new Error('The set of seats is wrong for VIP type.');
                }
            } 
            if(seatsList.type === 'normal') { 
                if(seatsList.seats.length !== 40) {
                    throw new Error('The set of seats is wrong for Normal type.');
                }
            } 
        }),
    check('depart')
        .custom(async (depart, {req}) => {
            if(!depart.date || !depart.time) {
                throw new Error('Need to select departure date and time.')
            }
        }),
    check('arrive')
        .custom(async (arrive, {req}) => {
            if(!arrive.date || !arrive.time) {
                throw new Error('Need to select departure date and time.')
            }
        }),
    check('price')
        .not()
        .isEmpty()
        .withMessage('Price field should not be empty.'),
];