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
        let userDataQuery = `SELECT firstname, lastname, moneyamount FROM info WHERE infoid = ${req.session.userid}`
        connection.query(userDataQuery, function (error, results) {
            if(error) {
                console.log(error);
            }
            let transactionDataQuery = `SELECT transactionid, senderid, receiverid, firstname, lastname, quantityamount FROM transactions INNER JOIN info ON transactions.receiverid = info.infoid WHERE senderid = ${req.session.userid} OR receiverid = ${req.session.userid}`
            connection.query(transactionDataQuery, function (error, results2) {
                res.render('index', {
                    login: true,
                    firstname:results[0].firstname,
                    lastname:results[0].lastname,
                    money:results[0].moneyamount,
                    userid:req.session.userid,
                    results2:results2
                });
            });
        });
    } else {
        res.redirect('/login')
    }
});

// router.get('/', (req, res) => {
//     if(req.session.loggedin) {
//         connection.query(`SELECT firstname AS tfirstname, lastname AS tlastname, quantityamount FROM transactions INNER JOIN info ON transactions.receiverid = info.infoid WHERE senderid = ${req.session.userid} OR receiverid = ${req.session.userid}`, (error, results) => {
//             if(error) {
//                 console.log(error)
//             } else {
//                 console.log(results[0].tfirstname)
//             }
//         })
//     }
// })

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

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// -------------------------------------------------------------------------

// Money Transfer Routes
router.get('/transfer', transfer.transfer);

router.post('/receiver', transfer.gettingReceiver);

router.post('/transactioncomplete', transfer.finishingTransaction);

// Transactions Routes
router.get('/transactions', transaction.showTransactions);

module.exports = router;