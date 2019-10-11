const chalk = require("chalk");
const url = require("url");
const { useOnline, getRequestParams } = require("./util");

module.exports = config => async (req, res, next) => {
  if (useOnline(req, config)) return next();

  const { mockDir, delay = 0 } = config;
  const { delay: urlDelay } = getRequestParams(req);
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

  await new Promise(resolve =>
    setTimeout(() => resolve(), parseInt(urlDelay) || delay || 0)
  );
  res.json(response);
};
