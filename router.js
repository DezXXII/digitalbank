// -------------------------------------------------------------------------

// Invoking DB connection
const connection = require('./database/db');
// Invoking Express
const express = require('express');
// Invoking Router
const router = express.Router();
// Invoking momentjs
const momentjs = require('moment')

// -------------------------------------------------------------------------

// Controllers Require Section
const register = require('./controllers/registerController');
const login = require('./controllers/loginController');
const transfer = require('./controllers/transferController');
const transaction = require('./controllers/transactionsController');
const editCredentials = require('./controllers/editUserController');

// -------------------------------------------------------------------------

// Index
router.get('/', (req, res) => {
    if(req.session.loggedin) {
        const userDataQuery = `SELECT firstname, lastname, moneyamount FROM info WHERE infoid = ${req.session.userid}`
        connection.query(userDataQuery, function (error, results) {
            if(error) {
                console.log(error);
            }
            const transactionDataQuery = `SELECT transactions.transactionid, transactions.senderid, transactions.receiverid, transactions.quantityamount, transactions.explicitdate, info.firstname AS sender_firstname, info.lastname AS sender_lastname, userinfo.firstname AS receiver_firstname, userinfo.lastname AS receiver_lastname 
                                            FROM transactions 
                                            JOIN info ON transactions.senderid = info.infoid
                                            JOIN info userinfo ON transactions.receiverid = userinfo.infoid WHERE senderid = ${req.session.userid} OR receiverid = ${req.session.userid}
                                            ORDER BY transactionid DESC`
            connection.query(transactionDataQuery, function (error, results2) {
                if(error) {
                    console.log(error)
                } else {
                    res.render('index', {
                        login: true,
                        firstname:results[0].firstname,
                        lastname:results[0].lastname,
                        money:results[0].moneyamount,
                        userid:req.session.userid,
                        results2:results2
                    });
                }
            });
        });
    } else {
        res.redirect('/login')
    }
});

// -------------------------------------------------------------------------

// Register Routes
router.get('/register', (req, res) => {
    res.render('register');
});

const { validateRegister } = require('./validators/registerValidation')
router.post('/register', validateRegister, register.registerUser);

// -------------------------------------------------------------------------

// Login & Auth Routes
router.get('/login', (req, res) => {
    res.render('login');
});

const { validateLogin } = require('./validators/loginValidation')
router.post('/login', validateLogin, login.authentification);

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// -------------------------------------------------------------------------

// Money Transfer Routes
router.get('/transfer', transfer.transfer);

const { validateReceiver, validateQuantity } = require('./validators/transferValidation')
router.post('/receiver', validateReceiver, transfer.gettingReceiver);

router.post('/transactioncomplete', validateQuantity, transfer.finishingTransaction);

// Transactions Routes
router.get('/transactions', transaction.showTransactions);

module.exports = router;

// -------------------------------------------------------------------------

// Profile Routes

router.get('/profile', (req, res) => {
    if(req.session.loggedin) {
        connection.query(`SELECT firstname, lastname FROM info WHERE infoid = ${req.session.userid}`, function (error, results) {
            if(error) {
                console.log(error)
            }
            connection.query(`SELECT email FROM users WHERE userid = ${req.session.userid}`, function (error, results2) {
                if(error) {
                    res.send(error)
                } else {
                    res.render('userProfile', {
                        firstname:results[0].firstname,
                        lastname:results[0].lastname,
                        email:results2[0].email
                    })
                }
            })
        })
    } else {
        res.redirect('login');
    }
});

// Edit Credentials Routes

// Email
router.get('/editemail', (req, res) => {
    if(req.session.loggedin) {
        res.render('userEditEmail')
    } else {
        res.render('login')
    }
});

// Password
router.get('/editpassword', (req, res) => {
    if(req.session.loggedin) {
        res.render('userEditPassword')
    } else {
        res.render('login')
    }
});

const { validateEmail, validatePassword } = require('./validators/userEditValidation')
router.post('/editemailcomplete', validateEmail, editCredentials.changeEmail);
router.post('/editpasswordcomplete', validatePassword, editCredentials.changePassword);

