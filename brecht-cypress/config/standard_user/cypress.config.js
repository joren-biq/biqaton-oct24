const { defineConfig } = require('cypress');

const generalConfig = require('../cypress.config');

module.exports = defineConfig({
  ...generalConfig,
  username: 'standard_user',
  password: 'secret_sauce',
});
