// Invoking DB connection
const connection = require('../database/db');

exports.showTransactions = (req, res) => {
    if(req.session.loggedin) {
        connection.query(`SELECT transactionid, senderid, receiverid, firstname, lastname, quantityamount FROM transactions INNER JOIN info ON transactions.receiverid = info.infoid WHERE senderid = ${req.session.userid} OR receiverid = ${req.session.userid}`, (error, results) => {
            if(error) {
                console.log(error);
            } else {
                res.render('transactions', {
                    login: true,
                    results:results,
                    userid:req.session.userid
                });
            }
        });
    } else {
        res.redirect('/login');
    }
};