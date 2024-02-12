class StringMessageAccessor {
  getMessages = (language) => {
    let message;
    if (language === "en") {
      message = require("../public/localization/string.en");
    }
    return message;
  };
}

module.exports = StringMessageAccessor;
