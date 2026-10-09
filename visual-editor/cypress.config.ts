import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // Override with CYPRESS_BASE_URL to run the PHP server on another port
    baseUrl: 'http://localhost:8000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
