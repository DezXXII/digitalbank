// Invoking express validator
const { body, validationResult } = require('express-validator');

// -------------------------------------------------------------------------

// Invoking DB connection
const connection = require('../database/db');

// -------------------------------------------------------------------------

// Validating Login Form

const validateLogin = [
    body('email', 'Incorrect email')
    .exists()
    .not()
    .isEmpty()
    .isEmail({require_tld: true}),
    body('password', 'Incorrect password')
    .exists()
    .not()
    .isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
                const values = req.body
                const validations = errors.array({onlyFirstError: true})
                res.render('login', {
                    values:values,
                    validations:validations
                })
            } else {
                return next()
            }
    }
]

module.exports = { validateLogin }