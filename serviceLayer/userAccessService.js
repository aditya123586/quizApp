const UserAccessManager = require("../businessLayer/manager//userAccessManager");
const StringMessageAccessor = require("../dataAccess/stringMessageAccessor");

const userAccessManager = new UserAccessManager();
const stringMessageAccessor = new StringMessageAccessor();

const responses = stringMessageAccessor.getMessages("en").API_RESPONSES;

class UserAccessService {
  async getUserDetails(req) {
    req.tempStore.message = responses.QUIZ_HOME;
    return userAccessManager.getUserDetails(req.body.userEmail);
  }
}

module.exports = UserAccessService;
