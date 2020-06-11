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
  report = {
    title: "",
    observation: "",
    number: "",
    lat: "",
    lng: "",
  };
  lat: any = 25.8132204;
  lng: any = -108.9858821;
  zoom: number = 14;
  newpaths = [];
  nestedPaths = [];
  circle = [
    { lat: 25.818017257913233, lng: -108.99542838310865, color: "#2d572c" },
    { lat: 25.815622073589832, lng: -108.9860728380647, color: "#ffff00" },
    { lat: 25.811063363153906, lng: -108.98933440422681, color: "#2d572c" },
    { lat: 25.811372433812217, lng: -108.99525672173169, color: "#ffff00" },
    { lat: 25.81330410715699, lng: -108.9999774095979, color: "#2d572c" },
    { lat: 25.81755367763111, lng: -109.001436531302, color: "#cb3234" },
    { lat: 25.821030485513475, lng: -108.99826079582837, color: "#ffff00" },
    { lat: 25.822034877674728, lng: -108.99242430901197, color: "#2d572c" },
    { lat: 25.819671943904048, lng: -108.98051261901855, color: "#cb3234" },
  ];
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
    this.report = value;
    this.lat = value.lat;
    this.lng = value.lng;
    this.zoom = 15;
  }
  Lot(id) {
    this.LotsService.getLot(id).subscribe((resp) => {
      this.newpaths = resp.coordinates;
      const array: any[] = Array.of(this.newpaths);
      this.nestedPaths = array;
      this.lat = resp.coordinates[0].lat;
      this.lng = resp.coordinates[0].lng;
    });
  }
}
