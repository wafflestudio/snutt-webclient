const getEnv = key =>
  process.env[key] ||
  (window.Cypress && window.Cypress.env(key)) ||
  console.log(`Environment variable ${key} is not set `);

export const baseUrl = getEnv('REACT_APP_BASE_URL');
export const apiKey = getEnv('REACT_APP_API_KEY');
export const fbAppId = getEnv('REACT_APP_API_KEY');
