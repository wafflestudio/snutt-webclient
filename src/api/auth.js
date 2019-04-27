import client, { encodeParams, urlEncodedFormConfig } from './client';

export const createAccount = async (id, password) =>
  (await client.post(
    'auth/register_local',
    encodeParams({
      id,
      password,
    }),
    urlEncodedFormConfig,
  )).data;

export const getTokenWithIdPassword = async (id, password) =>
  (await client.post(
    'auth/login_local',
    encodeParams({
      id,
      password,
    }),
    urlEncodedFormConfig,
  )).data;

export const getTokenWithFacebookToken = async (fb_id, fb_token) =>
  (await client.post(
    'auth/login_fb',
    encodeParams({
      fb_id,
      fb_token,
    }),
    urlEncodedFormConfig,
  )).data.token;
