const { defineConfig } = require('cypress');

const standardUserConfig = require('./cypress.config');
const laptopConfig = require('../viewports/cypress.config-laptop');

module.exports = defineConfig({
  ...standardUserConfig,
  ...laptopConfig,
});
