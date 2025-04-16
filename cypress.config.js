const { defineConfig } = require('cypress')
const dotenv = require('dotenv');

dotenv.config();

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome', 
    overwrite: false,
    html: true,
    json: true,
    timestamp: 'mmddyyyy_HHMMss',
  },
  e2e: {
    baseUrl:  process.env.CYPRESS_BASE_URL || 'http://localhost:3000/',  
    supportFile: 'cypress/support/e2e.js',
    specPattern: ['cypress/e2e/**/*.spec.js', 'cypress/api/**/*.spec.js'], 
    setupNodeEvents(on, config) {
      config.env.EMAIL = process.env.EMAIL;
      config.env.SENHA = process.env.SENHA;
      config.env.TOKEN = process.env.TOKEN;
      config.env.baseUrlFront = process.env.BASE_URL_FRONT
      return config;
    },
  },
})