const UserAccessService = require("./../serviceLayer/userAccessService");

const userAccessService = new UserAccessService();

class Authenticate {
  verifyToken(req, res, next) {
    //Created an empty object with a message and data to include in the API response, if applicable.
    req.tempStore = { message: "", data: {} };
    next();
  }

  async permitUser(req, res, next) {
    //Verifying if the user exists, and if so, retrieving their roles to determine API access permissions.
    req.tempStore.data = await userAccessService.getUserDetails(req);

    next();
  }
}

module.exports = Authenticate;
