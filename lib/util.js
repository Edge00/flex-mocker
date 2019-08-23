const url = require("url");

module.exports = (req, config) => {
  const { requestPrefixes } = config;
  const path = url.parse(req.url).path;
  if (!requestPrefixes.some(prefix => path.startsWith(prefix))) return true;
  if (req.headers.referer.includes("mode=online")) return true;
  return false;
};
