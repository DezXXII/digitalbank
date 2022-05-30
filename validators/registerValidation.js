// Invoking express validator
const { body, validationResult } = require('express-validator');

// -------------------------------------------------------------------------

// Validating Register Form
const validateRegister = [
    body('firstname', 'First name must contain between 3 and 15 characters')
    .exists()
    .isLength({min:3, max:15})
    .isAlpha(),
    body('lastname', 'Last name must contain between 3 and 15 characters')
    .exists()
    .isLength({min:3, max:15})
    .isAlpha(),
    body('email', 'Not a valid email')
    .exists()
    .normalizeEmail()
    .isEmail({require_tld: true}),
    body('password', 'Password must contain between 8 and 25 characters')
    .exists()
    .isLength({min:8, max:25})
    .isAlphanumeric(),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
                const values = req.body
                const validations = errors.array({onlyFirstError: true})
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