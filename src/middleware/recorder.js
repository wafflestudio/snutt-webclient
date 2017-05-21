import { upload } from '../logger/clickCollector';

const anonymize = (action) => {
  if (action.type === 'LOGIN_SUCCESS' || 'LOGIN_TEMP') { action.id = 'anonymous'; }
  return action;
};

export const logger = store => next => (action) => {
  upload(anonymize(action), 'action');
  return next(action);
};

export const crashReporter = store => next => (action) => {
  try {
    return next(action);
  } catch (err) {
    upload(err, 'crash');
    throw err;
  }
};
