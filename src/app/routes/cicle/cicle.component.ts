import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import Swal from "sweetalert2";
import { LotsAgricolaService } from "../../Services/lots-agricola.service";
import {} from "googlemaps"
declare var google: any;
@Component({
  selector: "app-cicle",
  templateUrl: "./cicle.component.html",
  styleUrls: ["./cicle.component.scss"],
})
export class CicleComponent implements OnInit {
distance:any;
lot;
origin: any;
destination: any;
  color;
  cicle:any = {};
  id;
  rutas: any = [];
  mostrar: boolean = true;
  showlote: any = {};
  showsublote: any = {};
  crops: any = {};
  lat: number = 25.8132204;
  lng: number = -108.9858821;
  zoom: number = 12;
  pathingCoordinates:any = [];
  allLots: any = [];
  mostrarsublotes: any = [];
  nestedPaths = [];
  constructor(
    public LotsService: LotsAgricolaService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {

    const sub = this.route.snapshot.paramMap.get("sub");
    const lot = this.route.snapshot.paramMap.get("lot");
    this.lot =  lot;
    this.ShowAllpathings(sub)
    this.datasublot(sub);
    this.LotsService.GetCicleid(sub).subscribe((resp: any) => {
      console.log(resp);
      this.showlote = resp;
      this.rutas = this.recor();
      const array: any[] = Array.of(this.nestedPaths);
      this.nestedPaths = array;
    });
  }
  datasublot(sub) {
    this.LotsService.GetSubloteID(sub).subscribe((resp: any) => {
      console.log(resp);
      this.cicle = resp.cicle
      console.log(this.cicle);
      
      this.crops = resp.crops;
      this.showsublote = resp;
      this.allLots = resp.subfieldCoordinates;
      this.mostrarsublotes = resp.subfieldCoordinates;
      this.lat = resp.subfieldCoordinates[0].lat;
      this.lng = resp.subfieldCoordinates[0].lng;
      this.zoom = 16;
    });
  }
  solomap(value) {
    let jun = [];
    for (let item of value.subfieldCoordinates) {
      const arrays = item;
      jun.push(arrays);
    }
    console.log(jun);
    return jun;
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
  showpathings(value) {
    console.log(value);
    
    this.pathingCoordinates = value.pathingCoordinates
    const array: any[] = Array.of(this.pathingCoordinates);
    this.pathingCoordinates = array;
    this.lat = value.pathingCoordinates[0].lat
    this.lng = value.pathingCoordinates[0].lng
    this.zoom = 14
    // this.destin( value.pathingCoordinates)
  
  }
  destin(value){
    const inicial = value[0]
    const ultmo = value.length - 1
    const final = value[ultmo]

    this.origin = inicial
    this.destination = final
    this.distance = this.calculatedistance(this.origin, this.destination)
    console.log(this.distance);
    
  }

  sumatotal(value, i){
    let suma:any = 0  
       suma += (this.calculatedistance(value.pathingCoordinates[i],value.pathingCoordinates[i+1]));    
    return suma
  }
  calculatedistance(point1, point2) {
    const p1 = new google.maps.LatLng(
    point1.lat,
    point1.lng
    );
    const p2 = new google.maps.LatLng(
    point2.lat,
    point2.lng
    );
    return  (google.maps.geometry.spherical.computeDistanceBetween(p1, p2)).toFixed(2);
}
// Mostrar todos las rutas
  ShowAllpathings(sub){
    this.LotsService.GetListPathingsList(sub).subscribe((resp:any) => {
    console.log("rutas son  ");
    console.log(resp);
     this.mostrarsublotes = resp

  })
}
}

