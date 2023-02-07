const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
};

const transpiledModules = require("next-transpile-modules")(["react-icons"]);

module.exports = transpiledModules(nextConfig);
