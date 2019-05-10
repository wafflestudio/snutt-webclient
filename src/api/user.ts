import client, { encodeParams, urlEncodedFormConfig } from './client';
import { TokenResponse, User, UnregisterResponse } from 'types';

export const getTemporaryToken = async (): Promise<TokenResponse> =>
  (await client.post('auth/request_temp')).data;

export const getUserInfo = async (): Promise<User> =>
  (await client.get('user/info')).data;

export const getNewTokenAfterLinkingFacebook = async (
  fb_id: string,
  fb_token: string,
): Promise<TokenResponse> =>
  (await client.post(
    'user/facebook',
    encodeParams({
      fb_id,
      fb_token,
    }),
    urlEncodedFormConfig,
  )).data;

export const getNewTokenAfterUnlinkingFacebook = async (): Promise<
  TokenResponse
> => (await client.delete('user/facebook')).data;

export const getNewTokenAfterLinkingLocalAccount = async (
  id: string,
  password: string,
): Promise<TokenResponse> =>
  (await client.post(
    'user/password',
    encodeParams({
      id,
      password,
    }),
    urlEncodedFormConfig,
  )).data;

export const getNewTokenAfterChangePassword = async (
  old_password: string,
  new_password: string,
): Promise<TokenResponse> =>
  (await client.put(
    'user/password',
    encodeParams({
      old_password,
      new_password,
    }),
    urlEncodedFormConfig,
  )).data;

export const removeAccount = async (): Promise<UnregisterResponse> =>
  (await client.delete('user/account')).data;
