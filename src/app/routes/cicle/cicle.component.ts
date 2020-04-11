import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import Swal from "sweetalert2";
import { LotsAgricolaService } from '../../Services/lots-agricola.service';

@Component({
  selector: 'app-cicle',
  templateUrl: './cicle.component.html',
  styleUrls: ['./cicle.component.scss']
})
export class CicleComponent implements OnInit {
  color;
  id;
  rutas:any = [];
  mostrar:boolean =  true;
  showlote:any ={}
  showsublote:any ={}
  crops:any = {}
  lat: number = 25.8132204;
  lng: number = -108.9858821;
  zoom: number = 12;
  allLots:any = []
  mostrarsublotes:any = [];
  nestedPaths = [];
  constructor(
    public LotsService:LotsAgricolaService,
    public route:ActivatedRoute) { 


}

  ngOnInit() {
    const sub = this.route.snapshot.paramMap.get("sub");
    const lot = this.route.snapshot.paramMap.get("lot");

    this.dataLot(lot)
    this.datasublot(sub);
    this.LotsService.GetCicleid(sub).subscribe((resp: any) => {
      console.log(resp)
      this.showlote = resp;
      this.rutas = this.recor()
      const array: any[] = Array.of(this.nestedPaths);
      this.nestedPaths = array
  });
  
  }
  datasublot(sub){
    this.LotsService.GetSubloteID(sub).subscribe((resp: any) => {
      console.log(resp);
      this.crops = resp.crops
      this.showsublote = resp
      this.allLots =  resp.subfieldCoordinates
      this.mostrarsublotes = resp.subfieldCoordinates
      this.lat =  resp.subfieldCoordinates[0].lat
      this.lng =  resp.subfieldCoordinates[0].lng
      this.zoom = 16
  });
  }
  dataLot(id){
    this.LotsService.getLot(id).subscribe((resp: any) => {
      console.log(resp)
      // this.showlote = resp;
      // this.zoom = 13
      //  this.mostrarsublotes = resp.subfield
      // this.nestedPaths = resp.coordinates;
      // this.lat = resp.coordinates[0].lat
      // this.lng = resp.coordinates[0].lng
      // const array: any[] = Array.of(this.nestedPaths);
      // this.nestedPaths = array
  });

  }
  solomap(value){
    let jun = []
    for(let item of value.subfieldCoordinates){
      const arrays = item
      jun.push(arrays)
    }
    console.log(jun);
    return jun
  }
  recor(){
    let arr = []
      for(let lot of this.showlote.weeks){
        for(let item of lot.pathings){
          const array = item
          arr.push(array)
          
        }
      }
      console.log(arr);
      
      return arr
}
}

 