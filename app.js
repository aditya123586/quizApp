require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const PORT = process.env.PORT;
const app = express();

const Logger = require("./middleware/logger");
const Authenticate = require("./middleware/authentication");
const StringMessageAccessor = require("./dataAccess/stringMessageAccessor");

const logger = new Logger();
const authenticate = new Authenticate();
const stringMessageAccessor = new StringMessageAccessor();

const serverListener = stringMessageAccessor.getMessages("en").SERVER_LISTENER;
const apiPath = stringMessageAccessor.getMessages("en").API_PATH;

app.use((req, res, next) => {
  req.tempStore = {};
  next();
});

app.use(bodyParser.json());

app.use(authenticate.verifyToken);

app.use(authenticate.permitUser);

app.use(apiPath.VERSION_1, routes);

app.listen(PORT, () => {
  logger.logInfo(`${serverListener}${PORT}`);
});
