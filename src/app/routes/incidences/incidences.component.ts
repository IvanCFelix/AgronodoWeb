import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-incidences",
  templateUrl: "./incidences.component.html",
  styleUrls: ["./incidences.component.scss"],
})
export class IncidencesComponent implements OnInit {
  nuevo = [
    {
      id: 156,
      agriculturalIncidence: {
        id: 168,
        name: {
          id: 19,
          name: "Mosquita Blanca",
        },
        status: 3,
        ground: 1,
        stem: 3,
        leaf: 1,
        fruit: 2,
      },
      technicalIncidence: null,
      incidence_history: null,
      type: "A",
      description:
        "This is an agricultural incidence with a level 1 incidences.",
    },
    {
      id: 158,
      agriculturalIncidence: {
        id: 170,
        name: {
          id: 20,
          name: "Mosquita Negra",
        },
        status: 3,
        ground: 1,
        stem: 3,
        leaf: 1,
        fruit: 2,
      },
      technicalIncidence: null,
      incidence_history: null,
      type: "A",
      description: "New incidence.",
    },
    {
      id: 160,
      agriculturalIncidence: {
        id: 172,
        name: {
          id: 20,
          name: "Mosquita Negra",
        },
        status: 3,
        ground: 1,
        stem: 3,
        leaf: 1,
        fruit: 2,
      },
      technicalIncidence: null,
      incidence_history: null,
      type: "A",
      description: "New incidence.",
    },
   
  ];
  constructor() {}

  ngOnInit() {}
}
