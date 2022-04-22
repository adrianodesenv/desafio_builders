import { AxiosResponse, AxiosRequestConfig } from 'axios'

export enum EHttpVerb {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}
export interface IServiceExceptionResponse {
  messages: string[] | null
}

export type THttpResponse<T = null> = AxiosResponse<T>
export type TServiceRequestConfig = AxiosRequestConfig

export interface IHttpClient {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig,
  ) => Promise<THttpResponse<T>>
  post: <T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ) => Promise<THttpResponse<T>>
  put: <T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ) => Promise<THttpResponse<T>>
  delete: <T>(
    url: string,
    config?: AxiosRequestConfig,
  ) => Promise<THttpResponse<T>>
}
