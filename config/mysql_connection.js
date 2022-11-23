var mysql = require('mysql2');

const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: '',
  database: process.env.DB_DATABASE,
  multipleStatements:true
});

mysqlConnection.connect((err) => {
  if (!err) {
     console.log("Connected MySql Database");
  } else {
     console.log("Connection Failed");
  }
});

module.exports = mysqlConnection;