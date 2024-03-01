// eslint-plugin-typeorm.js

const enforceEqualRule = require("./enforce-equal");
const plugin = { rules: { "enforce-equal": enforceEqualRule } };
module.exports = plugin;
