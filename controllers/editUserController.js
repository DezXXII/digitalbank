// Invoking DB connection
const connection = require('../database/db');

// Requering bcrypt
const bcryptjs = require('bcryptjs');

exports.changeEmail = (req, res) => {

    connection.query(`SELECT * FROM users WHERE email = ?`, [req.body.email], (error, results) => {
        console.log(results)
        if(error) {
            console.log(error)
        }
        if(results.length == 0) {
            connection.query(`UPDATE users SET email = '${req.body.email}' WHERE userid = ${req.session.userid}`)
        } else {
            res.render('userEditEmail', {
                alreadyUsedEmail: true
            })
        }
    })
}

exports.changePassword = async (req, res) => {

    const password = req.body.password
    let passwordHash = await bcryptjs.hash(password, 8);

    connection.query(`UPDATE users SET password = '${passwordHash}' WHERE userid = ${req.session.userid}`, function (error, results) {
        if(error) {
            console.log(error)
        } else {
            res.render('userEditPassword', {
                passwordEditSuccess: true
            })
        }
    })
}