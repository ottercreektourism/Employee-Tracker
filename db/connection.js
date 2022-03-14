const mysql = require('mysql2');

const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_db"
});

mysqlConnection.connect(function (err) {
    if (err) throw err;
    console.log("sql is connected");
})
module.exports = mysqlConnection;