const { FRONTEND_URL } = require("@jamal/env");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: FRONTEND_URL,
  generateRobotsTxt: true,
};
