// Invoking express validator
const { body, validationResult } = require('express-validator');

// -------------------------------------------------------------------------

// Invoking Register Form HTML elements


// -------------------------------------------------------------------------

// Validating Register Form
const validateRegister = [
    body('firstname')
    .exists()
    .isLength({min:3, max:15}),
    body('lastname')
    .exists()
    .isLength({min:3, max:15}),
    body('email')
    .exists()
    .not()
    .isEmpty()
    .isEmail()
    .normalizeEmail(),
    body('password')
    .exists()
    .isLength({min:8, max:25}),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            res.status(403)
            res.send( { errors: errors.array() } )
        } else {
            return next()
        }
    }
]

module.exports = { validateRegister }