const { FRONTEND_URL } = require("@untis-bot/env");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: FRONTEND_URL,
  generateRobotsTxt: true,
};
