import { ActivatedRoute } from "@angular/router";
import { Component, OnInit,ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import Swal from "sweetalert2";
import { LotsAgricolaService } from '../../Services/lots-agricola.service';
@Component({
  selector: 'app-lots',
  templateUrl: './lots.component.html',
  styleUrls: ['./lots.component.scss']
})
export class LotsComponent implements OnInit {
  @ViewChild("table") tableExp: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  filterPost = "";
  editing = {};
  listlots = [];
  temp = [];
  timeout: any;
  expanded: any = {};
  selected = [];
  lat: number = 25.8132204;
  lng: number = -108.9858821;
  zoom: number = 12;
  mostrarsublotes:any = [];
  user;
  nestedPaths = [];
  allLots:any = [
    // [
    //   {lat: 25.8161924011166, lng: -108.992683343871},
    //   {lat: 25.8120973160838, lng: -108.986160211547},
    //   {lat: 25.8059930586355, lng: -108.99388497351},
    //   {lat: 25.8161924011166, lng: -108.992683343871}
    // ],
    // [
    //   {lat: 25.8165787225848, lng: -108.997791108026},
    //   {lat: 25.8125609177224, lng: -108.986375626459},
    //   {lat: 25.803288540246, lng: -108.997361954584},
    //   {lat: 25.8102788090671, lng: -109.004400071039},
    //   {lat: 25.8102788090671, lng: -109.004400071039},
    //   {lat: 25.8165787225848, lng: -108.997791108026}
    // ]
    
  ]


  constructor(
    public LotsService:LotsAgricolaService,
    public route:ActivatedRoute) { }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function(d) {
        return d.names.toLowerCase().indexOf(val) !== -1   || !val ;
    });
    // update the rows
    this.listlots = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem("USER"));
    this.user = user 
    console.log(this.user.profile.prmsLotes)

    this.LotsService.listLots().subscribe(resp => {

     this.allLots = this.allmaps(resp)
    console.log(resp)
      this.listlots = resp;
      this.temp = resp;
    })
  }

  delete(value){
    console.log(value)
    Swal.fire({
      title: 'Seguro que quieres eliminar a',
      text: value.names,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.value) {
        console.log(result.value)
        this.LotsService.delete(value.id)
        .subscribe( resp => {
          
          this.LotsService.listLots().subscribe((resp:any) => {
            this.listlots = resp;
            this.temp = resp;
            console.log(resp)
          })

        })
      }
    })
  }
  
  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
    }, 100);
  }
  onDetailToggle(event) {
    console.log('Detail Toggled', event);
}
 
  onSelect({ selected }) {

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }



  showmap(value){
    
  console.log(value);
  this.LotsService.getLot(value).subscribe((resp: any) => {
    this.zoom = 13
    this.mostrarsublotes = resp.subfield
    this.lat = resp.coordinates[0].lat
    this.lng = resp.coordinates[0].lng

    this.nestedPaths = resp.coordinates;
    const array: any[] = Array.of(this.nestedPaths);
    this.nestedPaths = array
  });
  this.zoom = 14


  }
  allmaps(value){
    let jun = []
    for(let item of value){
      const arrays = item.coordinates
      jun.push(arrays)
    }
    return jun
  }
}




