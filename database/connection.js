const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'company',
    port: '3306',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connected")
    }
    else {
        console.log("Connection Failed")
        console.log(err);
    }
});



module.exports = mysqlConnection;