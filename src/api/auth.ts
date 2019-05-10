import client, { encodeParams, urlEncodedFormConfig } from './client';
import { RegistalLocalResponse, TokenResponse } from 'types';

export const createAccount = async (
  id: string,
  password: string,
): Promise<RegistalLocalResponse> =>
  (await client.post(
    'auth/register_local',
    encodeParams({
      id,
      password,
    }),
    urlEncodedFormConfig,
  )).data;

export const getTokenWithIdPassword = async (
  id: string,
  password: string,
): Promise<TokenResponse> =>
  (await client.post(
    'auth/login_local',
    encodeParams({
      id,
      password,
    }),
    urlEncodedFormConfig,
  )).data;

export const getTokenWithFacebookToken = async (
  fb_id: string,
  fb_token: string,
): Promise<TokenResponse> =>
  (await client.post(
    'auth/login_fb',
    encodeParams({
      fb_id,
      fb_token,
    }),
    urlEncodedFormConfig,
  )).data;
