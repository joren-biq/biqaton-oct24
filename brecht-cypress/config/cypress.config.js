const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const webpack = require('@cypress/webpack-preprocessor');
const { defineConfig } = require('cypress');

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    webpack({
      webpackOptions: {
        resolve: {
          extensions: ['.ts', '.js'],
        },
        module: {
          rules: [
            {
              test: /\.feature$/,
              use: [
                {
                  loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                  options: config,
                },
              ],
            },
          ],
        },
      },
    }),
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  chromeWebSecurity: false,
  trashAssetsBeforeRuns: true,
  video: true,
  e2e: {
    specPattern: '**/*.feature',
    setupNodeEvents,
    baseUrl: 'https://www.saucedemo.com',
  },
  urls: {
    home: '/',
    inventory: '/?/inventory.html',
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
  includeShadowDom: true
});
