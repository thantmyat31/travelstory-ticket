const {check} = require("express-validator");

exports.userSignupValidator = [
    check('displayName')
        .not()
        .isEmpty()
        .withMessage('Name is required.'),
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address.'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.'),
    check('confirmPassword')
        .custom(async (confirmPassword, {req}) => { 
            const password = req.body.password ;
            if(password !== confirmPassword){ 
                throw new Error('Passwords must be same') 
            } 
        })
];

exports.userSigninValidator = [
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address.'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.')
];


exports.forgotPasswordValidator = [
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Must be a valid email address.'),
    
];
exports.resetPasswordValidator = [
    check('newPassword')
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.')
]