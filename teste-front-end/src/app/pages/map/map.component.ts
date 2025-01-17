import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  apiLoaded: Observable<boolean>;

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyDihO0J4AXGmFKTRIRIk3sXfvkJVEMxPvQ', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }

  options: google.maps.MapOptions = {
    center: {lat:-30.0550975, lng:-51.1659437}
  };
}