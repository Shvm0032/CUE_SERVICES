const sql = require("mysql");

const sqlconnect = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cue_database",
    multipleStatements: true
});

sqlconnect.connect((err) => {
    if (!err) {
        console.log("Database connected");
    } else {
        console.log("Database not connected");
    }
});

module.exports = sqlconnect;