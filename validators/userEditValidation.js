// Invoking express validator
const { body, validationResult } = require('express-validator');

// -------------------------------------------------------------------------

// Validating Email Form
const validateEmail = [
    body('email', 'Invalid email')
    .exists()
    .not()
    .isEmpty()
    .isEmail({require_tld: true})
    .normalizeEmail(),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            const validations = errors.array({onlyFirstError: true})
            res.render('userEditEmail', {
                validations:validations
            })
        } else {
            return next()
        }
    }
]

// Validation Password Form
const validatePassword = [
    body('password', 'Password must contain between 8 and 25 alphanumeric characters')
    .exists()
    .not()
    .isEmpty()
    .isLength({min:8, max:25})
    .isAlphanumeric(),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            const validations = errors.array({onlyFirstError: true})
            res.render('userEditPassword', {
                validations:validations
            })
        } else {
            return next()
        }
    }
]

module.exports = { validateEmail, validatePassword }