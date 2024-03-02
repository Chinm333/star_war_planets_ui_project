import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import * as CONSTANTS from '../../shared/constants';
import { Planet, Resident } from '../../models/planet.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  url:string = CONSTANTS.API_AUTH.PLANETS_INFO;
  constructor(
    private httpService:HttpService,
  ) { }
  async getAllPlanetData(url:any){
    return this.httpService.get(url);
  }
  getPlanets(): Observable<Planet[]> {
    return this.httpService.get(this.url)
      .pipe(map(response => response.results as Planet[]));
  }

  getResident(url: string) {
    return this.httpService.get(url);
  }
}
