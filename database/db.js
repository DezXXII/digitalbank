const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'digitalbank_db'
});

connection.connect((error) => {
    if(error) {
        console.log('Error: ' +error);
        return;
    }
    console.log('Succesfully connected to the database');
});

module.exports = connection;