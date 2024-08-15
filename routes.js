const express = require("express");
const route = express.Router();

const StringMessageAccessor = require("./dataAccess/stringMessageAccessor");
const ErrorHandler = require("./middleware/errorHandler");

const stringMessageAccessor = new StringMessageAccessor();
const errorHandler = new ErrorHandler();

const apiAddress = stringMessageAccessor.getMessages("en").API_NAMES;

route.get(
  apiAddress.HOME.NAME,
  errorHandler.handlError(function (req, res, next) {}, apiAddress.HOME.ACCESS)
);

module.exports = route;
