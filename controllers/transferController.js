// Invoking DB connection
const connection = require('../database/db');
// Invoking momentjs
const momentjs = require('moment');

exports.transfer = (req, res) => {
    if(req.session.loggedin) {
        res.render('transfer', {
            receiver: false
        })
    } else {
        res.redirect('/login')
    }
};

exports.gettingReceiver = (req, res) => {
    const receiver = req.body.receiver

    if(receiver) {
        connection.query('SELECT userid FROM users WHERE email = ?', [receiver], (error, results) => {
            if(results.length == 0) {
                res.render('transfer', {
                    receiver: false,
                    receiverDoesNotExist: true
                })
            } else {
                res.render('transfer', {
                    receiver: true,
                    receiverid: results[0].userid
                });
                console.log(receiver)
            }
        })
    }
};

exports.finishingTransaction = (req, res) => {
    const money = parseFloat(req.body.quantity);
    const receiverid = req.body.receiverid
    
    // Dates
    const timestamp = momentjs().format('LLL');
    const explicitdate = momentjs().format('LL');
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    date = yyyy + '/' + mm + '/' + dd;

    if(req.session.loggedin){
        connection.query(`SELECT moneyamount FROM info WHERE infoid = ${req.session.userid}`, (error, results) => {
            if(error) {
                console.log(error)
            } else {
                const updatedSenderMoney = results[0].moneyamount - money
                // Sender Update Query
                connection.query(`UPDATE info SET moneyamount = ${updatedSenderMoney} WHERE infoid = ${req.session.userid}`)
                connection.query('INSERT INTO transactions SET ?', {senderid:req.session.userid, receiverid:receiverid, quantityamount:money, timestamp:timestamp, date:date, explicitdate:explicitdate}, (error, results) => {
                    if(error) {
                        console.log(error)
                    }
                });
            }
        })
        connection.query(`SELECT moneyamount FROM info WHERE infoid = ${receiverid}`, (error, results) => {
            if(error) {
                console.log(error)
            } else {
                const updatedReceiverMoney = results[0].moneyamount + money
                // Receiver Update Query
                connection.query(`UPDATE info SET moneyamount = ${updatedReceiverMoney} WHERE infoid = ${receiverid}`);
            }
            res.redirect('/')
        });
    }
};