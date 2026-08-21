const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    video: false,
  },
});

const config = {
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: parseInt(Cypress.env("VIEWPORT_WIDTH")) || 1280,
    viewportHeight: parseInt(Cypress.env("VIEWPORT_HEIGHT")) || 800,
  },
};
