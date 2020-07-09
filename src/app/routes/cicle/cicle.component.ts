import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import Swal from "sweetalert2";
import { LotsAgricolaService } from "../../Services/lots-agricola.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Location } from "@angular/common";
declare var google: any;
@Component({
  selector: "app-cicle",
  templateUrl: "./cicle.component.html",
  styleUrls: ["./cicle.component.scss"],
})
export class CicleComponent implements OnInit {
  @ViewChild("Ciclo") public contentModal;
  cicloForm: FormGroup;
  distance: any;
  public lot: any;
  public sub: any;
  origin: any;
  destination: any;
  color;
  cicle: any = {
    finish_date: "",
    passed_weeks: "",
    progress: "",
    remaining_weeks: "",
    start_date: "",
  };
  id;
  progressvalue = "0.0";
  rutas: any = [];
  mostrar: boolean = true;
  showlote: any = {};
  showsublote: any = {};
  crops: any = {};
  lat: number = 25.8132204;
  lng: number = -108.9858821;
  zoom: number = 12;
  pathingCoordinates: any = [];
  allLots: any = [];
  mostrarsublotes: any = [];
  nestedPaths = [];
  cicleLength: any;
  reportes = [];
  inicio = {
    url: "../../../assets/img/Marcadores/Inicio.png",
    scaledSize: { height: 40, width: 30 },
  };
  fin = {
    url: "../../../assets/img/Marcadores/final.png",
    scaledSize: { height: 40, width: 30 },
  };
  sano = {
    url: "../../../assets/img/Marcadores/saludable1.png",
    scaledSize: { height: 40, width: 30 },
  };
  reportNormal = {
    url: "../../../assets/img/Marcadores/reporte1.png",
    scaledSize: { height: 40, width: 30 },
  };
  alerta = {
    url: "../../../assets/img/Marcadores/alerta1.png",
    scaledSize: { height: 40, width: 30 },
  };
  peligro = {
    url: "../../../assets/img/Marcadores/peligro1.png",
    scaledSize: { height: 40, width: 30 },
  };
  constructor(
    public LotsService: LotsAgricolaService,
    public route: ActivatedRoute,
    public Location: Location
  ) {
    this.cicloForm = new FormGroup({
      start_date: new FormControl("", Validators.required),
      finish_date: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    const sub = this.route.snapshot.paramMap.get("sub");
    const lot = this.route.snapshot.paramMap.get("lot");
    this.lot = lot;
    this.sub = sub;

    this.LotsService.GetSubloteID(sub).subscribe((resp: any) => {
      this.verify(resp);
    });
  }

  setUrl(value) {
    let URL = {
      url: value,
      scaledSize: { height: 40, width: 30 },
    };
    return URL;
  }
  verify(value) {
    console.log(value);
    const sub = this.sub;
    const lot = this.lot;
    if (value.cicle !== null) {
      this.datacicle(sub, lot);
    } else {
      this.DataNoCicle(sub);
    }
  }
  DataNoCicle(sub) {
    this.modalshow("@getbootstrap");
    console.log("el id es " + sub);
    this.LotsService.GetSubloteID(sub).subscribe((resp: any) => {
      console.log(resp);
      this.showsublote = resp;
      this.allLots = resp.subfieldCoordinates;
      this.mostrarsublotes = resp.subfieldCoordinates;
      this.lat = resp.subfieldCoordinates[0].lat;
      this.lng = resp.subfieldCoordinates[0].lng;
      this.zoom = 16;
    });
  }

  datacicle(sub, lot) {
    this.ShowAllpathings(sub);
    this.LotsService.GetSubloteID(sub).subscribe((resp: any) => {
      console.log(resp);
      this.cicle = resp.cicle;
      console.log(this.cicle);
      this.crops = resp.crops;
      this.progressvalue = this.crops.progress;
      this.showsublote = resp;
      this.allLots = resp.subfieldCoordinates;
      this.mostrarsublotes = resp.subfieldCoordinates;
      this.lat = resp.subfieldCoordinates[0].lat;
      this.lng = resp.subfieldCoordinates[0].lng;
      this.zoom = 16;
    });

    this.LotsService.GetCicleid(sub).subscribe(
      (resp: any) => {
        this.showlote = resp;
        this.rutas = this.recor();
        const array: any[] = Array.of(this.nestedPaths);
        this.nestedPaths = array;
      },
      (err: any) => {
        Swal.fire({
          text: err._body,
          showConfirmButton: true,
          icon: "error",
          width: "250px",
        });
      }
    );
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
  modalshow(value: string) {
    this.contentModal.show();
  }
  suma(val,val2) {
    let res = val + val2
    return res
  }
  recor() {
    let arr = [];
    for (let lot of this.showlote.weeks) {
      for (let item of lot.pathings) {
        const array = item;
        arr.push(array);
      }
    }
    return arr;
  }
  showpathings(value) {
    console.log(this.rutas);

    console.log(value);
    this.reportes = value.reports;
    this.pathingCoordinates = value.pathingCoordinates;
    const array: any[] = Array.of(this.pathingCoordinates);
    // this.rutas = this.recor();
    this.pathingCoordinates = array;
    this.lat = value.pathingCoordinates[0].lat;
    this.lng = value.pathingCoordinates[0].lng;
    this.zoom = 14;
  }
  destin(value) {
    const inicial = value[0];
    const ultmo = value.length - 1;
    const final = value[ultmo];

    this.origin = inicial;
    this.destination = final;
    this.distance = this.calculatedistance(this.origin, this.destination);
    console.log(this.distance);
  }

  sumatotal(value, i) {
    let suma: any = 0;
    suma += this.calculatedistance(
      value.pathingCoordinates[i],
      value.pathingCoordinates[i + 1]
    );
    return suma;
  }
  calculatedistance(point1, point2) {
    const p1 = new google.maps.LatLng(point1.lat, point1.lng);
    const p2 = new google.maps.LatLng(point2.lat, point2.lng);
    return google.maps.geometry.spherical
      .computeDistanceBetween(p1, p2)
      .toFixed(2);
  }
  // Mostrar todos las rutas
  ShowAllpathings(sub) {
    this.LotsService.GetListPathingsList(sub).subscribe(
      (resp: any) => {
        console.log("rutas son  ");
        console.log(resp);
        this.mostrarsublotes = resp;
      },
      (err: any) => {
        Swal.fire({
          text: err._body,
          showConfirmButton: true,
          icon: "error",
          width: "250px",
        });
      }
    );
  }

  subfieldID = "";
  ciclo(id, value) {
    this.subfieldID = id;
    console.log(value, id);
    if (value) {
      this.LotsService.CicleRegister(id, value).subscribe((resp: any) => {
        this.datacicle(id, value);
      });
    }
  }
  goback() {
    return this.Location.back();
  }
}
