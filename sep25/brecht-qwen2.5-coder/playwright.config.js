// playwright.config.js

const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  timeout: 30000, // Timeout per test in milliseconds
  expect: {
    timeout: 5000, // Expectations timeout in milliseconds
  },
  fullyParallel: false,
  retries: 1, // Number of retry attempts for failed tests
  reporter: [
    ["list"],
    ["html"], // Use the list reporter
  ],
  debug: true,
});
