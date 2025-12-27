const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "db_siswa",
});

db.connect((err) => {
  if (err) {
    console.error("Koneksi DB gagal:", err);
  } else {
    console.log("MySQL terkoneksi");
  }
});

module.exports = db;
