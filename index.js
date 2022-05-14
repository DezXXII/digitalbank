// Invoking Express
const express = require('express');
const app = express();

// Setting urlencoded to capture forms data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Public directory
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

// Setting view engine
app.set('view engine', 'ejs');

// Session var
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Invoking database connection module
const connection = require('./database/db');

// Routes
app.use('/', require('./router'))

app.listen(5000, () => {
    console.log('Server running in http://localhost:5000');
});