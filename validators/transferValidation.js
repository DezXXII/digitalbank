// Invoking express validator
const { body, validationResult } = require('express-validator');

// -------------------------------------------------------------------------

// Validating Receiver Form
const validateReceiver = [
    body('receiver', 'Invalid email')
    .exists()
    .not()
    .isEmpty()
    .isEmail({require_tld: true})
    .normalizeEmail(),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
                const values = req.body
                const validations = errors.array({onlyFirstError: true})
                res.render('transfer', {
                    values:values,
                    validations:validations,
                    receiver: false
                })
            } else {
                return next()
            }
    }
]

// Validating Receiver Form
const validateQuantity = [
    body('quantity', 'The amount cannot be empty')
    .exists()
    .not()
    .isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
                const values = req.body
                const validations = errors.array({onlyFirstError: true})
                res.render('transfer', {
                    values:values,
                    validations:validations,
                    receiver: true,
                    receiverid:req.body.receiverid
                })
            } else {
                return next()
            }
    }
]

module.exports = { validateReceiver, validateQuantity }