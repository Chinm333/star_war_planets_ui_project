import { Component, OnInit, signal } from '@angular/core';
import { PlanetsService } from './planets.service';
import * as CONSTANTS from '../../shared/constants';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.scss'
})
export class PlanetsComponent implements OnInit {
  planetData = signal<any>([]);
  totalNumData:number = 0;
  nextPageUrl = signal<string>('');
  prevPageUrl = signal<string>('');;
  constructor(
    private planetService:PlanetsService,
  ){}
  ngOnInit(): void {
    let url = CONSTANTS.API_AUTH.PLANETS_INFO;
    this.getPlanetData(url);
  }
  async getPlanetData(url:string){
    (await this.planetService.getAllPlanetData(url)).subscribe({
      next:(res)=>{
        this.planetData.set(res.results);
        this.totalNumData = res.count;
        this.nextPageUrl.set(res.next);
        this.prevPageUrl.set(res.previous);
      }
    })
  }
  goToPrev(){
    this.getPlanetData(this.prevPageUrl());
  }
  goToNext(){
    this.getPlanetData(this.nextPageUrl());
  }
}
