const fs = require('fs');

const report = require('multiple-cucumber-html-reporter');

function getBrowserDetails() {
  const stringifyData = JSON.stringify(
    fs.readFileSync('./cypress/reports/browser/browserDetails.json', 'utf-8'),
  );
  const parsedData = JSON.parse(JSON.parse(stringifyData));
  return parsedData;
}
const browserDetails = getBrowserDetails();

report.generate({
  jsonDir: 'cypress/reports/json', // ** Path of .json file **//
  reportPath: 'cypress/reports/html',
  metadata: {
    browser: {
      name: 'chrome',
      version: `${browserDetails.displayName} ${browserDetails.majorVersion}`,
    },
    device: 'Docker',
    platform: {
      name: 'linux',
      version: 'Debian 12 (bookworm)',
    },
  },
});
