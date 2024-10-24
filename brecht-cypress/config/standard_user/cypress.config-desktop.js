const { defineConfig } = require('cypress');

const standardUserConfig = require('./cypress.config');
const desktopConfig = require('../viewports/cypress.config-desktop');

module.exports = defineConfig({
  ...standardUserConfig,
  ...desktopConfig,
});
