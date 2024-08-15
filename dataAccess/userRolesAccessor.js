const ConnectDB = require("../databaseConfiguration/connectDB");
const StringMessageAccessor = require("../dataAccess/stringMessageAccessor");

const connectDB = new ConnectDB();
const stringMessageAccessor = new StringMessageAccessor();

const roles = stringMessageAccessor.getMessages("en").ROLES;

class UserRolesAccessor {
  async getUserDetails(userEmail) {
    return {
      roleID: roles.ADMIN,
      userEmail,
    };
  }
}

module.exports = UserRolesAccessor;
