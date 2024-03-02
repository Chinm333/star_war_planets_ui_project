import { Component, Input, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { CardData, Planet, Resident } from '../../models/planet.model';
import { PlanetsService } from '../planets/planets.service';
import { Observable, map } from 'rxjs';
@Component({
  selector: 'app-planet-card',
  templateUrl: './planet-card.component.html',
  styleUrl: './planet-card.component.scss',
  animations: [
    trigger("cardFlip", [
      state(
        "default",
        style({
          transform: "none"
        })
      ),
      state(
        "flipped",
        style({
          transform: "rotateY(180deg)"
        })
      ),
      state(
        "matched",
        style({
          visibility: "false",
          transform: "scale(0.05)",
          opacity: 0
        })
      ),
      transition("default => flipped", [animate("400ms")]),
      transition("flipped => default", [animate("400ms")]),
      transition("* => matched", [animate("400ms")])
    ])
  ]
})
export class PlanetCardComponent implements OnInit {
  @Input() planetData:any;
  residents_link: any[] = [];
  residents_people: Resident[] = [];
  data: CardData = {
    imageId: "pDGNBK9A0sk",
    state: "default"
  };
  constructor(
    private planetService:PlanetsService,
  ) { }
  ngOnInit(): void {

  }
  cardClicked() {
    if (this.data.state === "default") {
      this.showResidents(this.planetData);
      this.data.state = "flipped";
    } else {
      this.data.state = "default";
    }
  }
  getResidents(planet: Planet): Observable<Resident[]> {
    return this.planetService.getResident(planet.url)
      .pipe(map(planetData => planetData.residents as Resident[]));
  }
  showResidents(planet: Planet) {
    this.getResidents(planet).subscribe(residents => {
      this.residents_link = residents;
      this.getResidentData();
    });

  }
  getResidentData(){
    this.residents_people = [];
    for (let i = 0; i < this.residents_link.length; i++) {
      this.planetService.getResident(`${this.residents_link[i]}`).subscribe({
        next:(res)=>{
          this.residents_people.push(res);
        }
      })
    }
  }
}
