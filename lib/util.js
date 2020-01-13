const url = require("url");

function getRequestParams(req) {
  const params = new URLSearchParams(req.headers.referer.split("?")[1]);
  const isOnline = params.get("mode") && params.get("mode").includes("online");
  const delay = params.get("delay");
  return { isOnline, delay };
}

function useOnline(req, config) {
  if (!req.headers.referer) return true;
  const { requestPrefixes } = config;
  const path = url.parse(req.url).path;
  // did not hit prefix
  if (!requestPrefixes.some(prefix => path.startsWith(prefix))) return true;
  const { isOnline } = getRequestParams(req);
  // not use mock
  if (isOnline) return true;
  return false;
}

module.exports = { getRequestParams, useOnline };
