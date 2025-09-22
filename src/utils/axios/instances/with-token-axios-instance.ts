import axios from "axios";

import type { AxiosError, InternalAxiosRequestConfig } from "axios";

import { handleApiError } from "../error-handler";
import { clearTokens, getAccessToken, refreshAccessToken } from "../token-service";

let encryptionKey: CryptoKey | null = null;

async function getEncryptionKey(): Promise<CryptoKey> {
  if (!encryptionKey) {
    encryptionKey = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, [
      "encrypt",
      "decrypt",
    ]);
  }
  return encryptionKey;
}

async function encryptPayload(payload: any, key: CryptoKey) {
  const encoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = encoder.encode(JSON.stringify(payload));

  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);

  return {
    iv: Array.from(iv),
    data: btoa(String.fromCharCode(...new Uint8Array(ciphertext))),
  };
}

export function createAxiosWithToken(baseURL: string) {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
  });

  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
      const token = getAccessToken();
      if (token) {
        (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
      }

      // Encrypt request body
      if (config.data) {
        const key = await getEncryptionKey();
        const encrypted = await encryptPayload(config.data, key);
        config.data = encrypted;
      }

      return config;
    },
    error => Promise.reject(error),
  );

  instance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newToken = await refreshAccessToken();
        if (newToken && originalRequest.headers) {
          (originalRequest.headers as Record<string, string>).Authorization = `Bearer ${newToken}`;
          return instance(originalRequest);
        }
        clearTokens();
        window.location.href = "/login";
      }
      handleApiError(error);
      return Promise.reject(error);
    },
  );

  return instance;
}
