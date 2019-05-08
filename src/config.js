const getEnv = key =>
  process.env[key] ||
  (window.Cypress && window.Cypress.env(key)) ||
  console.log(`Environment variable ${key} is not set `);

module.exports = {
  baseUrl: getEnv('REACT_APP_BASE_URL'),
  apiKey: getEnv('REACT_APP_API_KEY'),
  fbAppId: getEnv('REACT_APP_API_KEY'),
};
