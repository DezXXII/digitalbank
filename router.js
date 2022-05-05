// -------------------------------------------------------------------------

// Invoking DB connection
const connection = require('./database/db');
// Invoking Express
const express = require('express');
//Invoking Router
const router = express.Router();

// -------------------------------------------------------------------------

// Controllers Require Section
const register = require('./controllers/registerController');
const login = require('./controllers/loginController');
const transfer = require('./controllers/transferController');
const transaction = require('./controllers/transactionsController');

// -------------------------------------------------------------------------

// Index
router.get('/', (req, res) => {
    if(req.session.loggedin) {
        connection.query(`SELECT firstname, lastname, moneyamount FROM info WHERE infoid = ${req.session.userid}`, function (error, results) {
            if(error) {
                console.log(error)
            } else {
                res.render('index', {
                    login: true,
                    firstname:results[0].firstname,
                    lastname:results[0].lastname,
                    money:results[0].moneyamount
               });
            }
        })
    } else {
        res.redirect('/login')
    }
});

// -------------------------------------------------------------------------

// Register Routes
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', register.registerUser);

// -------------------------------------------------------------------------

// Login & Auth Routes
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/auth', login.authentification);

// -------------------------------------------------------------------------

// Money Transfer Routes
router.get('/transfer', transfer.transfer);

router.post('/receiver', transfer.gettingReceiver);

router.post('/transactioncomplete', transfer.finishingTransaction);

// Transactions Routes
router.get('/transactions', transaction.showTransactions);

module.exports = router;