const bodyParser = require("body-parser");
const mocker = require("./mocker");
const watcher = require("./watcher");
const { useOnline } = require("./util");

module.exports = config => app => {
  app.use((req, res, next) => {
    // bodyParser.json causes proxy failed when mode=online
    if (useOnline(req, config)) return next();
    bodyParser.json()(req, res, next);
  });
  app.use(bodyParser.urlencoded({ extended: true }));
  app.all("*", mocker(config));
  watcher(config);
};
