import { ActivatedRoute } from "@angular/router";
import { LotsAgricolaService } from "./../../Services/lots-agricola.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"],
})
export class ReportsComponent implements OnInit {
  allLots: any = [];
  rutas: any = [];
  report;
  showlote: any = {};
  nestedPaths:any = [];
  pathingCoordinates:any = [];
  lat: number = 25.8132204;
  lng: number = -108.9858821;
  zoom: number = 12;
  constructor(
    public LotsService: LotsAgricolaService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    const sub = this.route.snapshot.paramMap.get("sub");
    const rep = this.route.snapshot.paramMap.get("rep");
    console.log("el sublote es " + sub);
    console.log("le reporte es " + rep);
    this.showsub(sub);
    this.LotsService.GetReportListid(sub, rep).subscribe((resp: any) => {
      console.log(resp);
      this.report = resp;
    });
    this.pathingCoordinates = this.cicle(sub)
    const array: any[] = Array.of(this.pathingCoordinates);
    this.pathingCoordinates = array;
  }
  showsub(sub) {
    this.LotsService.GetSubloteID(sub).subscribe((resp: any) => {
      console.log(resp);
      this.allLots = resp.subfieldCoordinates;
      // this.showlote = resp;
      // this.rutas = this.recor();
      // const array: any[] = Array.of(this.nestedPaths);
      // this.nestedPaths = array;
    });
  }
  recor() {
    let arr = [];
    for (let lot of this.showlote.weeks) {
      for (let item of lot.pathings) {
        const array = item;
        arr.push(array);
      }
    }
    console.log(arr);

    return arr;
  }
  cicle(sub){
    const array:any = []
    this.LotsService.GetCicleid(sub).subscribe(resp => {
      console.log(resp);
      for(let item of resp.weeks){
       for(let pathings of item.pathings){
         for(let pathingCoordinates of pathings.pathingCoordinates){
          array.push(pathingCoordinates)
         }
       }
      }
      console.log(array)
      return array
      
    })
  }
}
