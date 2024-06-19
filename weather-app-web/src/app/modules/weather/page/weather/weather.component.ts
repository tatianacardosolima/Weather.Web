import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherData } from 'src/app/models/interfaces/WeatherData';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: []
})
export class WeatherComponent implements OnInit,OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  initialCityName = 'Campinas';
  weatherDatas!: WeatherData;
  searchIcon = faMagnifyingGlass;
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWheatherDatas(this.initialCityName);
  }

  getWheatherDatas(cityName: string): void {
    this.weatherService.getWeatherDatas(cityName).subscribe({
      next: (response) => {
        response && (this.weatherDatas = response);
        console.log(this.weatherDatas);
      },
      error: (error) => console.log(error),
    });
  }
  onSubmit(): void
  {
    this.getWheatherDatas(this.initialCityName);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
