const UserRolesAccessor = require("../../dataAccess/userRolesAccessor");

const userRolesAccessor = new UserRolesAccessor();

class userAccessManager {
  async getUserDetails(userEmail) {
    return userRolesAccessor.getUserDetails(userEmail);
  }
}

module.exports = userAccessManager;
