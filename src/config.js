const getEnv = (key) =>
  process.env[key] ||
  (window.Cypress && window.Cypress.env(key)) ||
  console.log(`Environment variable ${key} is not set `);

export const baseUrl = 'https://snutt-api-dev.wafflestudio.com';
export const apiKey =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdHJpbmciOiJhbmRyb2lkIiwia2V5X3ZlcnNpb24iOiIwIiwiaWF0IjoxNTA3NzIzNzA3fQ.XVhn7m0CnPvIWeZ36PEMqm_oROQj-iPy4gAgg62N97A';
export const fbAppId = 'qer';
