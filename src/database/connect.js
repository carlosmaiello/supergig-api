const mysql = require("mysql2/promise");

module.exports = async () => {
  if (global.connection && global.connection.state !== "disconnected")
    return global.connection;

  global.connection = await mysql.createConnection(
    "mysql://root:@localhost:3306/supergig_db"
  );

  return global.connection;
};
