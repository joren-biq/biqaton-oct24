const { defineConfig } = require('cypress');

const standardUserConfig = require('./cypress.config');
const tabletConfig = require('../viewports/cypress.config-tablet');

module.exports = defineConfig({
  ...standardUserConfig,
  ...tabletConfig,
});
