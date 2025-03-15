const { getDefaultConfig } = require("expo/metro-config");

module.exports = {
  ...getDefaultConfig(__dirname),
  server: {
    insecureHTTP: true,  // Allow HTTP requests
  },
};

