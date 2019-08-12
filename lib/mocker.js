const chalk = require("chalk");
const url = require("url");

module.exports = config => (req, res, next) => {
  const { mockDir, requestPrefixes } = config;

  let response;
  const path = url.parse(req.url).path;

  // request didn't hit requestPrefixes. do next
  const hitTargets = requestPrefixes.some(prefix => path.startsWith(prefix));
  if (!hitTargets) next();

  // when url has search「mode=online」. do next
  const isOnline = req.headers.referer.includes("mode=online");
  if (isOnline) next();

  // if no mock file found. tell user to create it
  try {
    response = require(`${mockDir}${path}.json`);
  } catch (err) {
    try {
      response = require(`${mockDir}${path}.js`)(req);
    } catch (error) {
      const msg = `\n Mock Server Error: Please crate ${mockDir}/${path}.[json | js] file to enable mock`;
      res.json({ code: 404, msg });
      console.log(chalk.red(msg));
      next();
    }
  }

  res.json(response);
};
