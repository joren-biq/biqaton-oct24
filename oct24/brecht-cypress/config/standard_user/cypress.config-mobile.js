const { defineConfig } = require('cypress');

const standardUserConfig = require('./cypress.config');
const mobileConfig = require('../viewports/cypress.config-mobile');

module.exports = defineConfig({
  ...standardUserConfig,
  ...mobileConfig,
});
