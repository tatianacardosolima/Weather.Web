import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from 'src/app/models/interfaces/WeatherData';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = '06796dc351d4c0e489ff4422cef9c832';

  constructor(private http: HttpClient) {}

  getWeatherDatas(cityName: string): Observable<WeatherData> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&mode=json&appid=${this.apiKey}`,
      {}
    ).pipe(
      map((response: any) => {
        return {
          name: response.name,
          main: {
            temp: response.main.temp,
            // Mapeie outros campos conforme necessário
          },
          // Mapeie outros campos conforme necessário
        } as WeatherData;
      })
    );
  }
}
