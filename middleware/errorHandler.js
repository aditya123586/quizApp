const HttpResponse = require("../serviceLayer/httpResponse");
const Logger = require("./logger");
const StringMessageAccessor = require("../dataAccess/stringMessageAccessor");

const logger = new Logger();
const httpResponse = new HttpResponse();
const stringMessageAccessor = new StringMessageAccessor();

const errors = stringMessageAccessor.getMessages("en").ERRORS;

class ErrorHandler {
  handlError = (asyncFn, rolesPermitted) => async (req, res, next) => {
    try {
      if (!req.body.userDetails) {
        httpResponse.sendError(errors.INVALID_USER, res, next);
      } else if (!rolesPermitted.includes(req.body.userDetails.roleID)) {
        httpResponse.sendError(errors.ACCESS_DENIED, res, next);
      } else {
        await asyncFn(req, res, next);

        httpResponse.send(req, res);
      }
    } catch (err) {
      const errorDetails = {
        "Error Type": err && err.name ? err.name : errors.UNKNOWN,
        "Api Name": req.path,
        "Error Description": err && err.message ? err.message : "",
        "Req Body": req && req.body ? req.body : "",
        "Req Query": req && req.query ? req.query : "",
        "Req Params": req && req.params ? req.params : "",
      };
      logger.logError(errorDetails);

      httpResponse.sendError(err, res, next);
    }
  };
}

module.exports = ErrorHandler;
