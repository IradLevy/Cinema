const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cinema",
});

con.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to mySql");
  }
});

const execute = (sql) => {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { execute };
