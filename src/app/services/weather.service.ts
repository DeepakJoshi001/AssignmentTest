import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getCoordinates(state: string): Observable<any> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${state}&count=1`;
    return this.http
      .get(url)
      .pipe(
        catchError((err) => throwError(() => new Error('Geocoding failed')))
      );
  }
  getWeatherByState(state: string): Observable<any> {
    return this.getCoordinates(state).pipe(
      switchMap((data: any) => {
        if (data.results && data.results.length > 0) {
          const { latitude, longitude } = data.results[0];
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
          return this.http.get(url);
        } else {
          return throwError(
            () => new Error('No results found for the given state')
          );
        }
      }),
      catchError((err) => throwError(() => new Error('Weather API failed')))
    );
  }
}
