// Invoking DB connection
const connection = require('../database/db');

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
                res.send('No se encontró ese usuario')
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
    const money = parseInt(req.body.quantity)
    const receiverid = req.body.receiverid
    
    if(req.session.loggedin){
        connection.query(`SELECT moneyamount FROM info WHERE infoid = ${req.session.userid}`, (error, results) => {
            if(error) {
                console.log(error)
            } else {
                const updatedSenderMoney = results[0].moneyamount - money
                // Sender Update Query
                connection.query(`UPDATE info SET moneyamount = ${updatedSenderMoney} WHERE infoid = ${req.session.userid}`)
                connection.query('INSERT INTO transactions SET ?', {senderid:req.session.userid, receiverid:receiverid, quantityamount:money}, (error, results) => {
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