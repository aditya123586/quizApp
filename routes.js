const express = require("express");
const route = express.Router();

const StringMessageAccessor = require("./dataAccess/stringMessageAccessor");
const ErrorHandler = require("./middleware/errorHandler");

const stringMessageAccessor = new StringMessageAccessor();
const errorHandler = new ErrorHandler();

const apiResponses = stringMessageAccessor.getMessages("en").API_RESPONSES;
const apiAddress = stringMessageAccessor.getMessages("en").API_NAMES;

route.get(
  apiAddress.HOME.NAME,
  errorHandler.handlError(function (req, res, next) {
    req.tempStore.message = apiResponses.HOME_URL;
  })
);

module.exports = route;
