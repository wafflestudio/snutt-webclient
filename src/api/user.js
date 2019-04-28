import client, { encodeParams, urlEncodedFormConfig } from './client';

export const getTemporaryToken = async () =>
  (await client.post('auth/request_temp')).data;

export const getUserInfo = async () => (await client.get('user/info')).data;

export const getNewTokenAfterLinkingFacebook = async (fb_id, fb_token) =>
  (await client.post(
    'user/facebook',
    encodeParams({
      fb_id,
      fb_token,
    }),
    urlEncodedFormConfig,
  )).data;

export const getNewTokenAfterUnlinkingFacebook = async () =>
  (await client.delete('user/facebook')).data;

export const getNewTokenAfterLinkingLocalAccount = async (id, password) =>
  (await client.post(
    'user/password',
    encodeParams({
      id,
      password,
    }),
    urlEncodedFormConfig,
  )).data;

export const getNewTokenAfterChangePassword = async (
  old_password,
  new_password,
) =>
  (await client.put(
    'user/password',
    encodeParams({
      old_password,
      new_password,
    }),
    urlEncodedFormConfig,
  )).data;

export const removeAccount = () => client.delete('user/account');
