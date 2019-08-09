const bodyParser = require("body-parser");
const mocker = require("./mocker");
const watcher = require("./watcher");

module.exports = config => app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.all("*", mocker(config));
  watcher(config);
};
