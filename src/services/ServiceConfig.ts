import axios, { AxiosError } from 'axios'

import {
  THttpResponse,
  IHttpClient,
  TServiceRequestConfig,
  IServiceExceptionResponse,
} from '@/services/ServiceConfig.types'

export class ServiceConfig implements IHttpClient {
  public readonly timeout = 60000

  public async get<T, R = THttpResponse<T>>(
    url: string,
    config: TServiceRequestConfig = {},
  ): Promise<R> {
    try {
      return await axios.get(url, config)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async post<T, B, R = THttpResponse<T>>(
    url: string,
    data?: B,
    config: TServiceRequestConfig = {},
  ): Promise<R> {
    try {
      return await axios.post(url, data, config)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async put<T, B, R = THttpResponse<T>>(
    url: string,
    data?: B,
    config: TServiceRequestConfig = {},
  ): Promise<R> {
    try {
      return await axios.put(url, data, config)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async delete<T, R = THttpResponse<T>>(
    url: string,
    config: TServiceRequestConfig = {},
  ): Promise<R> {
    try {
      return await axios.delete(url, config)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async applyInterceptors(store: any) {
    axios.interceptors.request.use(async ({ ...request }) => {
      return {
        ...request,
        baseURL: 'https://api.openweathermap.org/data/2.5/weather',
        data: request.data,
        headers: await this.getHeaders(request, store),
        timeout: this.getTimeout(request),
      }
    })

    axios.interceptors.response.use(
      response => ({
        ...response,
        data: response.data,
        config: {
          ...response.config,
          timeout: this.getTimeout(response),
        },
      }),
      error => {
        return Promise.reject(this.getError(error))
      },
    )
  }

  public async getHeaders(
    requestOrResponse: TServiceRequestConfig | THttpResponse,
    store: any,
  ) {
    const headers: typeof requestOrResponse.headers = {
      ...requestOrResponse.headers,
    }

    headers['Content-Type'] = 'application/json'
    headers['Accept-Language'] = 'pt-BR'

    return headers
  }

  public getError(
    errorResponse: AxiosError<IServiceExceptionResponse>,
  ): string {
    let error: string = ''

    if (errorResponse?.response) {
      const errorMessages = errorResponse?.response.data
      error = errorMessages?.messages
        ? String(errorMessages?.messages?.join(', '))
        : ''
    }

    return error ?? ''
  }

  public getTimeout(requestOrResponse: any): number {
    const timeout: number = this.isRequest(requestOrResponse)
      ? requestOrResponse?.timeout
      : requestOrResponse?.config?.timeout

    return timeout > 0 ? timeout : this.timeout
  }

  public isRequest(requestOrResponse: any): boolean {
    return typeof requestOrResponse?.config !== 'object'
  }
}

export default new ServiceConfig()
