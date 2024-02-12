const StringMessageAccessor = require("../dataAccess/stringMessageAccessor");

const stringMessageAccessor = new StringMessageAccessor();

const environments = stringMessageAccessor.getMessages("en").ENVIRONMENTS;

class Logger {
  logInfo(log) {
    if (process.env.NODE_ENV === environments.LOCAL) console.log(log);
  }

  logError(err) {
    if (process.env.NODE_ENV === environments.LOCAL) console.error(err);
  }
}

module.exports = Logger;
