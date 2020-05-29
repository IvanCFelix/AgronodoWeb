import { Component, OnInit } from "@angular/core";
import { Incidences } from "../../Services/Incidences.service";
import { ActivatedRoute } from "@angular/router";
import { LotsAgricolaService } from "../../Services/lots-agricola.service";

@Component({
  selector: "app-incidences-view",
  templateUrl: "./incidences-view.component.html",
  styleUrls: ["./incidences-view.component.scss"],
})
export class IncidencesViewComponent implements OnInit {
  Incidence = {};
  technicalIncidence = [];
  agriculturalIncidence = [];
  reports = [];
  lat: number = 25.8132204;
  lng: number = -108.9858821;
  zoom: number = 14;
  newpaths = [];
  nestedPaths = [];
  constructor(
    public IncidenceService: Incidences,
    public route: ActivatedRoute,
    public LotsService: LotsAgricolaService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    console.log(id);

    this.IncidenceService.getIncidenceId(id).subscribe((resp) => {
      console.log(resp);
      this.Lot(resp.field_id);
      this.Incidence = resp;
      this.technicalIncidence = resp.technicalIncidence;
      this.agriculturalIncidence = resp.agriculturalIncidence;
      this.reports = resp.reports;
    });
  }
  ViewReport(value) {
    console.log(value);
  }
  Lot(id) {
    this.LotsService.getLot(id).subscribe((resp) => {
      this.newpaths = resp.coordinates;
      const array: any[] = Array.of(this.newpaths);
      this.nestedPaths = array;
    });
  }
}
