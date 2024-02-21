const { defineConfig } = require("cypress");
const { configureAllureAdapterPlugins } = require("@mmisty/cypress-allure-adapter/plugins");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://[DOMAIN]',
    setupNodeEvents(on, config) {
      configureAllureAdapterPlugins(on, config);
      return config;
    }
  },
  env: {
    allure: true,
    allureResults: 'cypress/allure-result',
  }
});
