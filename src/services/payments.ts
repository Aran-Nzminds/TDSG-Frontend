import { API_BASE_URLS } from '../utils/axios/api-config';
import { createAxiosWithToken } from '../utils/axios/instances/with-token-axiosInstance';
import { createAxiosWithoutToken } from '../utils/axios/instances/without-token-axiosInstance';

const paymentsApiWithToken = createAxiosWithToken(API_BASE_URLS.payments);
const paymentsApiWithoutToken = createAxiosWithoutToken(API_BASE_URLS.payments);

export const getPaymentHistory = async () => {
  const response = await paymentsApiWithToken.get('/payments/history');
  return response.data;
};

export const createPublicPayment = async (paymentData: any) => {
  const response = await paymentsApiWithoutToken.post('/payments/public', paymentData);
  return response.data;
};
