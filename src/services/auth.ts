import { API_BASE_URLS } from '../utils/axios/api-config';
import { createAxiosWithToken } from '../utils/axios/instances/with-token-axiosInstance';
import { createAxiosWithoutToken } from '../utils/axios/instances/without-token-axiosInstance';

const authApiWithToken = createAxiosWithToken(API_BASE_URLS.auth);
const authApiWithoutToken = createAxiosWithoutToken(API_BASE_URLS.auth);

export const login = async (email: string, password: string) => {
  const response = await authApiWithoutToken.post('/auth/login', { email, password });
  return response.data;
};

export const getProfile = async () => {
  const response = await authApiWithToken.get('/users/profile');
  return response.data;
};
