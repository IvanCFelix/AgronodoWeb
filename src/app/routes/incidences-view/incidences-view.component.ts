import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Incidences } from "../../Services/Incidences.service";
import { ActivatedRoute } from "@angular/router";
import { LotsAgricolaService } from "../../Services/lots-agricola.service";
import { Uris } from "./../../Services/Uris";

@Component({
  selector: "app-incidences-view",
  templateUrl: "./incidences-view.component.html",
  styleUrls: ["./incidences-view.component.scss"],
})
export class IncidencesViewComponent implements OnInit {
  @ViewChild("views") public ViewsModal;
  @ViewChild("elemtAudio") elementoAudio: ElementRef;

  Incidence = {
    agriculture_type: "",
    datetime: "",
    description: "",
    field_id: "",
    field_name: "",
    id: "",
    reports: [],
    risk: "",
    type: "",
  };
  Url = Uris.API_ENDPOINT_AUDIO;
  technicalIncidence = [];
  agriculturalIncidence = [];
  reports = [];
  type = "";
  reporttechnicalIncidence = {
    title: "",
    observation: "",
    number: "",
    lat: "",
    lng: "",
  };
  reportAgricola = {
    fruit: "",
    ground: "",
    name: { id: "", name: "" },
    plant: "",
    datetime: new Date(),
  };

  audios = [];
  images = [];
  videos = [];

  lat: any = 25.8132204;
  lng: any = -108.9858821;
  zoom: number = 14;
  newpaths = [];
  nestedPaths = [];
  ReportsPaths = [];
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
      this.ReportsPaths = resp.reports;
      if (resp.agriculturalIncidence.length > 0) {
        this.reports = resp.agriculturalIncidence;
        this.type = "agriculturalIncidence";
      } else {
        this.reports = resp.technicalIncidence;
        this.type = "technicalIncidence";
      }
      this.Lot(resp.field_id);
      this.Incidence = resp;
      // this.technicalIncidence = resp.technicalIncidence;
    });
  }
  ViewReport(value) {
    console.log(value);
    if (this.type === "agriculturalIncidence") {
      this.reportAgricola = value;
    } else {
      this.reporttechnicalIncidence = value;
      this.lat = value.lat;
      this.lng = value.lng;
      this.zoom = 15;
    }
  }
  showpathing(value) {
    console.log(value);
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
  viewModal(value, type) {
    switch (type) {
      case "images":
        this.images = value.images;
        break;
      case "video":
        this.videos = value.videos;
        break;
      case "audios":
        this.audios = value.audios;
        console.log(value);
        break;
      default:
    }
    return this.ViewsModal.show();
  }
  reproducir() {
    this.elementoAudio.nativeElement.play();
  }
}
