// Invoking express validator
const { body, validationResult } = require('express-validator');

// -------------------------------------------------------------------------

// Invoking Register Form HTML elements


// -------------------------------------------------------------------------

// Validating Register Form
const validateRegister = [
    body('firstname', 'Not a valid firstname')
    .exists()
    .isLength({min:3, max:15}),
    body('lastname', 'Not a valid lastname')
    .exists()
    .isLength({min:3, max:15}),
    body('email', 'Not a valid email')
    .exists()
    .isEmpty()
    .isEmail({require_tld: true})
    .normalizeEmail(),
    body('password', 'Not a valid password')
    .exists()
    .isLength({min:8, max:25}),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
                console.log(req.body)
                const values = req.body
                const validations = errors.array()
                res.render('register', {
                    values:values,
                    validations:validations
                })
            } else {
                return next()
            }
    }
]

module.exports = { validateRegister }