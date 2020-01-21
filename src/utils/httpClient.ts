import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

export type InterceptorType<V> = [(value: V) => V | Promise<V>, (error: any) => any];

export class HttpClient {
  public static getInstance(config?: AxiosRequestConfig) {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient(config);
    }
    return HttpClient.instance;
  }

  public static registerRequestInterceptors(interceptors: Array<InterceptorType<AxiosRequestConfig>>): number[] {
    return interceptors.map(interceptor =>
      HttpClient.getInstance().axiosInstance.interceptors.request.use(...interceptor)
    );
  }

  public static registerResponseInterceptors(interceptors: Array<InterceptorType<AxiosResponse>>): number[] {
    return interceptors.map(interceptor =>
      HttpClient.getInstance().axiosInstance.interceptors.response.use(...interceptor)
    );
  }

  public static ejectRequestInterceptors(ids: number[]) {
    ids.map(id => HttpClient.getInstance().axiosInstance.interceptors.request.eject(id));
  }

  public static ejectResponseInterceptors(ids: number[]) {
    ids.map(id => HttpClient.getInstance().axiosInstance.interceptors.response.eject(id));
  }

  private static instance: HttpClient;

  public axiosInstance: AxiosInstance;

  private constructor(config?: AxiosRequestConfig) {
    this.axiosInstance = Axios.create(config);
  }

  public resetConfig(config?: AxiosRequestConfig) {
    this.axiosInstance = Axios.create(config);
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): Observable<T> {
    return this.request('get', url, config);
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Observable<T> {
    return this.request('delete', url, config);
  }

  public head<T = any>(url: string, config?: AxiosRequestConfig): Observable<T> {
    return this.request('head', url, config);
  }

  public options<T = any>(url: string, config?: AxiosRequestConfig): Observable<T> {
    return this.request('options', url, config);
  }

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Observable<T> {
    return this.request('post', url, data, config);
  }

  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Observable<T> {
    return this.request('put', url, data, config);
  }

  public patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Observable<T> {
    return this.request('patch', url, data, config);
  }

  private request<T>(
    method: 'get' | 'post' | 'delete' | 'put' | 'head' | 'options' | 'patch',
    ...args: any[]
  ): Observable<T> {
    return new Observable<T>(subscriber => {
      const req: <R>(...args: any[]) => Promise<AxiosResponse<R>> = this.axiosInstance[method];
      req<T>(...args)
        .then(res => {
          subscriber.next(res.data);
        })
        .catch(err => {
          subscriber.error(err);
        })
        .finally(() => {
          subscriber.complete();
        });
    });
  }
}
