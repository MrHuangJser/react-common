import { HttpClient } from '../../src/utils/httpClient';

describe('httpClient', () => {
  it('should be defined and singleton', async () => {
    const httpClientTest = HttpClient.getInstance();
    expect(httpClientTest).toBeInstanceOf(HttpClient);
    expect(httpClientTest.axiosInstance.defaults.baseURL).toBe(undefined);

    const httpClient = HttpClient.getInstance({ baseURL: 'http://123' });
    expect(httpClient).toBeInstanceOf(HttpClient);
    expect(httpClient.axiosInstance.defaults.baseURL).toBe(undefined);

    httpClient.resetConfig({ baseURL: 'http://123' });
    expect(httpClientTest.axiosInstance.defaults.baseURL).toBe('http://123');
    expect(httpClient.axiosInstance.defaults.baseURL).toBe('http://123');
  });
});
