const HttpResponse = require("../serviceLayer/httpResponse");
const Logger = require("./logger");
const StringMessageAccessor = require("../dataAccess/stringMessageAccessor");

const logger = new Logger();
const httpResponse = new HttpResponse();
const stringMessageAccessor = new StringMessageAccessor();

const errors = stringMessageAccessor.getMessages("en").ERRORS;
const roles = stringMessageAccessor.getMessages("en").ROLES;

class ErrorHandler {
  handlError = (asyncFn) => async (req, res, next) => {
    try {
      if (!req.body.userDetails) {
        httpResponse.sendError(errors.INVALID_USER, res, next);
      }

      req.body.isUser = req.body.userDetails.role_id === roles.USER;

      await asyncFn(req, res, next);

      httpResponse.send(req, res);
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
