import { IWeather } from '@/@types/entities/Weather/WeatherEntity.types'
import { IHttpClient } from '@/services/ServiceConfig.types'

export class WeatherService {
  constructor(private readonly httpClient: IHttpClient) {}

  getWeather = () =>
    this.httpClient.get<IWeather>(
      '?lat=-23.431558856481733&lon=-46.71998475926259&lang=pt_br&appid=82fd53f9cad485bfd1ac43f053003fb3&units=metric',
    )
}
