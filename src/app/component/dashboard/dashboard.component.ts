import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  state = '';
  weather: any = null;
  error = '';

  constructor(private weatherService: WeatherService) {}

  searchWeather() {
    if (!this.state.trim()) return;

    this.weatherService.getWeatherByState(this.state).subscribe({
      next: (data) => {
        this.weather = data.current_weather;
        this.error = '';
      },
      error: (err) => {
        this.weather = null;
        this.error = err.message;
      },
    });
  }
}
