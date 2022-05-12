// Invoking DB connection
const connection = require('../database/db');

exports.showTransactions = (req, res) => {
    if(req.session.loggedin) {
        const userDataQuery = `SELECT firstname, lastname, moneyamount FROM info WHERE infoid = ${req.session.userid}`
        connection.query(userDataQuery, function (error, results) {
            if(error) {
                console.log(error);
            }
            const transactionDataQuery = `SELECT transactions.transactionid, transactions.senderid, transactions.receiverid, transactions.quantityamount, transactions.timestamp, info.firstname AS sender_firstname, info.lastname AS sender_lastname, userinfo.firstname AS receiver_firstname, userinfo.lastname AS receiver_lastname 
                                            FROM transactions 
                                            JOIN info ON transactions.senderid = info.infoid
                                            JOIN info userinfo ON transactions.receiverid = userinfo.infoid WHERE senderid = ${req.session.userid} OR receiverid = ${req.session.userid}
                                            ORDER BY transactionid DESC`
            connection.query(transactionDataQuery, function (error, results2) {
                if(error) {
                    console.log(error)
                } else {
                    res.render('transactions', {
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
        res.redirect('/login');
    }
};