import { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

// TODO: CHANGE BASE_URL for API calls

// This base URL will be prepended to all API requests.
const BASE_URL = 'https://avtc-back-9b28e9f9b3db.herokuapp.com';

// Define a generic type for useApi, with a default of 'unknown'
function useApi<T = unknown>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const get = async (params: object = {}) => {
    try {
      setLoading(true);
      const response: AxiosResponse<T> = await axios.get(`${BASE_URL}${endpoint}`, { params });
      setData(response.data);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err);
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const post = async (body: object) => {
    try {
      setLoading(true);
      const response: AxiosResponse<T> = await axios.post(`${BASE_URL}${endpoint}`, body);
      setData(response.data);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err);
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const put = async (body: object) => {
    try {
      setLoading(true);
      const response: AxiosResponse<T> = await axios.put(`${BASE_URL}${endpoint}`, body);
      setData(response.data);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err);
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const del = async () => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}${endpoint}`);
      setData(null);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, get, post, put, del };
}

export default useApi;
