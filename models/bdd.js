const mysql = require("mysql")

const db = mysql.createConnection({
    host: "mysql-yanishlali.alwaysdata.net",
    database: "yanishlali_asimov",
    user: "220794",
    password: "PjGg2D9n9"
});

module.exports = db