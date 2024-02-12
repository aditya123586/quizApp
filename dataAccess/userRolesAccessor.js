const ConnectDB = require("../databaseConfiguration/connectDB");

const connectDB = new ConnectDB();

class UserRolesAccessor {
  async getUserDetails(userEmail) {
    return connectDB
      .getDBConnection()
      .oneOrNone(`SELECT role_id FROM "user".usermaster WHERE username = $1`, [
        userEmail,
      ]);
  }
}

module.exports = UserRolesAccessor;
