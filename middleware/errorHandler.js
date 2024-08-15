const HttpResponse = require("../serviceLayer/httpResponse");
const Logger = require("./logger");
const StringMessageAccessor = require("../dataAccess/stringMessageAccessor");

const logger = new Logger();
const httpResponse = new HttpResponse();
const stringMessageAccessor = new StringMessageAccessor();

const errors = stringMessageAccessor.getMessages("en").ERRORS;

class ErrorHandler {
  handlError = (asyncFn, rolesPermitted, schema) => async (req, res, next) => {
    try {
      if (!req.tempStore.data) {
        httpResponse.sendError(errors.INVALID_USER, res, next);
      } else if (!rolesPermitted.includes(req.tempStore.data.roleID)) {
        httpResponse.sendError(errors.ACCESS_DENIED, res, next);
      } else {
        const { error } = schema.validate(
          Object.keys(req.query).length ? req.query : req.body
        );

        if (error) {
          req.tempStore.data = error;
          httpResponse.sendError(errors.INVALID_PAYLOAD, res, next, error);
        } else {
          await asyncFn(req, res, next);

          httpResponse.send(req, res);
        }
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

      httpResponse.sendError(err, res, next, errorDetails);
    }
  };
}

module.exports = ErrorHandler;
