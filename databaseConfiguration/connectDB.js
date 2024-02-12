const pgp = require("pg-promise")();

const db = pgp({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
});

class ConnectDB {
  getDBConnection() {
    return db;
  }
}

module.exports = ConnectDB;
