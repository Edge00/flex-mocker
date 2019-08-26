const chalk = require("chalk");
const url = require("url");
const missPrefixAndOffline = require("./util");

module.exports = config => (req, res, next) => {
  if (missPrefixAndOffline(req, config)) return next();

  const { mockDir } = config;
  let path = url.parse(req.url).path;

  if (req.method === "GET" && path.includes("?")) {
    path = path.split("?")[0];
  }

  let response;

  try {
    response = require(`${mockDir}${path}.json`);
  } catch (err) {
    try {
      response = require(`${mockDir}${path}.js`)(req);
    } catch (error) {
      // if no mock file found. tell user to create it
      const msg = `\n Mock Server Error: Please crate ${mockDir}/${path}.[json | js] file to enable mock`;
      res.json({ code: 404, msg });
      console.log(chalk.red(msg));
      return next();
    }
  }

  res.json(response);
};
