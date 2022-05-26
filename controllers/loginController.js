// Invoking DB connection
const connection = require('../database/db');

// Requering bcrypt
const bcryptjs = require('bcryptjs');

exports.authentification = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let passwordHash = await bcryptjs.hash(password, 8);
    if( email && password ) {
        connection.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if(results.length == 0 || !(await bcryptjs.compare(password, results[0].password))) {
                res.render('login', {
                    invalidEmailOrPassword: true
                });
            } else {
                req.session.loggedin = true;
                req.session.email = results[0].email;
                req.session.userid = results[0].userid;
                res.redirect('/');
            }
        })
    }
};