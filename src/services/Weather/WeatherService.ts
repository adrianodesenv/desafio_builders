import { IWeather } from '@/@types/entities/Weather/WeatherEntity.types'
import { IHttpClient } from '@/services/ServiceConfig.types'

export class WeatherService {
  constructor(private readonly httpClient: IHttpClient) {}

  getWeather = (queryString: string) =>
    this.httpClient.get<IWeather>(queryString)
}
