const mysql = require("mysql");
const util = require("util");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "creative",
});



connection.connect(err => {
  if (err) {
    console.log("Error occurred ", err);
  } else {
    console.log("Connected to mysql database");
  }
});

const query = util.promisify(connection.query).bind(connection);

module.exports = { connection, query };