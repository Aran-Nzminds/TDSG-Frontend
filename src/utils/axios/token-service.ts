import Cookies from 'js-cookie';
import axios from 'axios';
import { API_BASE_URLS } from './api-config';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const getAccessToken = (): string | undefined => Cookies.get(ACCESS_TOKEN_KEY);

export const setAccessToken = (token: string) => {
  Cookies.set(ACCESS_TOKEN_KEY, token, { secure: true, sameSite: 'strict', path: '/' });
};

export const getRefreshToken = (): string | undefined => Cookies.get(REFRESH_TOKEN_KEY);

export const setRefreshToken = (token: string) => {
  Cookies.set(REFRESH_TOKEN_KEY, token, { secure: true, sameSite: 'strict', path: '/' });
};

export const clearTokens = () => {
  Cookies.remove(ACCESS_TOKEN_KEY, { path: '/' });
  Cookies.remove(REFRESH_TOKEN_KEY, { path: '/' });
};

/**
 * @description Requests a new access token using the refresh token.
 * If successful, updates both tokens in cookies.
 * If it fails, clears all tokens (forces the user to login again).
 */
//! Need to change the endpoint
export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;
  try {
    const response = await axios.post(`${API_BASE_URLS.auth}/auth/refresh`, { refreshToken });
    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);
    return response.data.accessToken as string;
  } catch (error) {
    clearTokens();
    return null;
  }
};
