// Invoking DB connection
const connection = require('../database/db');

// Requering bcrypt
const bcryptjs = require('bcryptjs');

exports.registerUser = async (req, res) => {

    const email = req.body.email;

    connection.query('SELECT * FROM users WHERE email = ?', [email], async (req, results) => {
        if(results.length == 0) {
            const password = req.body.password;
            let passwordHash = await bcryptjs.hash(password, 8);
            connection.query('INSERT INTO users SET ?', {email:email, password:passwordHash}, async(error, results) => {
                if(error) {
                    console.log(error);
                } else {
                    res.render('login');
                }
            });
        
            const firstname = req.body.firstname;
            const lastname = req.body.lastname;
        
            connection.query('INSERT INTO info SET ?', {firstname:firstname, lastname:lastname, moneyamount: 20000}, (error, results) => {
                if(error) {
                    console.log(error);
                }
            })
        } else {
            res.render('register', {
                alreadyUsedEmail: true
            })
        }
    })
};