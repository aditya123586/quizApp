const UserAccessService = require("./../serviceLayer/userAccessService");

const userAccessService = new UserAccessService();

class Authenticate {
  verifyToken(req, res, next) {
    next();
  }

  async permitUser(req, res, next) {
    const userDetails = await userAccessService.getUserDetails(req);
    req.body.userDetails = userDetails;

    next();
  }
}

module.exports = Authenticate;
