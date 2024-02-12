const UserAccessManager = require("../businessLayer/manager//userAccessManager");

const userAccessManager = new UserAccessManager();

class UserAccessService {
  async getUserDetails(req) {
    return userAccessManager.getUserDetails(req.body.userEmail);
  }
}

module.exports = UserAccessService;
