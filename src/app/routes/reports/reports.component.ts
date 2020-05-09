import { ActivatedRoute } from "@angular/router";
import { LotsAgricolaService } from "./../../Services/lots-agricola.service";
import { Component, OnInit } from "@angular/core";
import { Location } from '@angular/common'

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"],
})
export class ReportsComponent implements OnInit {
  sublote: any = {};
  allLots: any = [];
  ruta: any = {};
  lote;
  sub;
  report: any = [];
  recorrido: any = [];
  showlote: any = {};
  nestedPaths: any = [];
  pathingCoordinates: any = [];
  lat: number = 25.8132204;
  lng: number = -108.9858821;
  zoom: number = 12;
  constructor(
    public LotsService: LotsAgricolaService,
    public route: ActivatedRoute,
    public location:Location
  ) {}

  ngOnInit() {
    const sub = this.route.snapshot.paramMap.get("sub");
    const rep = this.route.snapshot.paramMap.get("rut");

    this.showsub(sub);
    this.LotsService.GetReportListid(sub, rep).subscribe((resp: any) => {
      console.log(resp);
      this.report = resp;
    });
    this.ShowReportId(sub, rep);
    // this.ShowAllpathings(sub);

    // this.pathingCoordinates = this.cicle(sub)
    const array: any[] = Array.of(this.pathingCoordinates);
    this.pathingCoordinates = array;
  }

  showsub(sub) {
    this.LotsService.GetSubloteID(sub).subscribe((resp: any) => {
      console.log(resp);
      this.report = resp.reports;
      this.allLots = resp.subfieldCoordinates;
      this.sublote = resp;
      // this.showlote = resp;
      // this.rutas = this.recor();
      // const array: any[] = Array.of(this.nestedPaths);
      // this.nestedPaths = array;
    });
  }
  ShowReportId(sub, rep) {
    this.LotsService.GetListPathingsID(sub, rep).subscribe((resp: any) => {
      console.log("ruta es");
      console.log(resp);
      this.ruta = resp;
      this.recorrido = resp.pathingCoordinates;
    });
  }
  onCircleClicked(evento, id) {
    console.log(id);
  }
  goback() {
    return this.location.back();
  }
}
