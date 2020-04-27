import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import Swal from "sweetalert2";
import { LotsAgricolaService } from '../../Services/lots-agricola.service';

@Component({
  selector: 'app-lots',
  templateUrl: './lots.component.html',
  styleUrls: ['./lots.component.scss']
})

export class LotsComponent implements OnInit {
  
  @ViewChild('Ciclo') public contentModal;
  @ViewChild("table") tableExp: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  newpaths:any = [];
  mostrar = true;
  id;
  crops = [];
  colorDemo1 = "";
  sublotesforms: FormGroup;
  filterPost = "";
  listlots = [];
  temp = [];
  pathSub =[];
  pathsSubLotes=[]
  timeout: any;
  expanded: any = {};
  selected = [];
  lat: number = 25.8132204;
  lng: number = -108.9858821;
  zoom: number = 12;
  mostrarsublotes:any = [];
  nestedPaths = [];
  user;
  showlote:any={}
  editlots =[]
  allLots:any = [];
  subloteSolo;
  cicloForm:FormGroup;
  iconmap = {
    iconUrl: '../../assets/img/market.png',
    iconHeigh:10
  }

  constructor(
    public LotsService:LotsAgricolaService,
    public route:ActivatedRoute,
    public router: Router) { 

      this.sublotesforms = new FormGroup({
        _id: new FormControl(-1),
        nickname: new FormControl("", Validators.required),
        crops: new FormControl("", Validators.required),
        agriculture_type: new FormControl("", Validators.required)
      });
      
      this.cicloForm = new FormGroup({
          start_date: new FormControl("", Validators.required),
          finish_date: new FormControl("", Validators.required),
      })
    }




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
    this.LotsService.Getcrops().subscribe((resp: any) => {
      this.crops = resp      
    });
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
          this.LotsService.listLots().subscribe(resp => {
            this.allLots = this.allmaps(resp)
             this.listlots = resp;
             this.temp = resp;
           })

        })
      }
    })
  }
  deletesublote(value){
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
        this.LotsService.deleteSub(value.id)
        .subscribe( resp => {
          this.getLot()
        })
      }
    })
  }
  addMarker(lat: number, lng: number) {
    let obj = {
      lat: lat,
      lng: lng
    };
    this.newpaths.push(obj);
    
    if(this.newpaths.length == 3){
      let path = this.newpaths[0]
      this.newpaths.push(path)
      console.log(this.newpaths);
  
    }
    if(this.newpaths.length > 4){
      this.newpaths.splice(this.newpaths.length - 2,1);
      let pos = this.newpaths.length - 1
      let uwu = this.newpaths[pos]
      this.newpaths.push(uwu)
      let path = this.newpaths[0]
      this.newpaths.push(path)
       console.log(this.newpaths);
 
    }
    const array: any[] = Array.of(this.newpaths);
    this.nestedPaths = array
   
  }
  addMakerSubLote(lat: number, lng: number) {
    let obj = {
      lat: lat,
      lng: lng
    };
    this.pathsSubLotes.push(obj);

    if(this.pathsSubLotes.length == 3){
      let path = this.pathsSubLotes[0]
      this.pathsSubLotes.push(path)
      console.log(this.pathsSubLotes);
  
    }
    if(this.pathsSubLotes.length > 4){
      this.pathsSubLotes.splice(this.pathsSubLotes.length - 2,1);
      let pos = this.pathsSubLotes.length - 1
      let uwu = this.pathsSubLotes[pos]
      this.pathsSubLotes.push(uwu)
      let path = this.pathsSubLotes[0]
      this.pathsSubLotes.push(path)
       console.log(this.pathsSubLotes);
    }
    const array: any[] = Array.of(this.pathsSubLotes);
    this.pathSub = array;
   
   
  }
  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
    }, 100);
  }
  modalshow(value:string){
    this.contentModal.show();
  }
 
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  verify:boolean = true
  lotSublote:any;
  verifylot(value){   
    this.lotSublote = value.subfield[0];    
    let cordi = value.coordinates[0]
    let subfi =  value.subfield[0].subfieldCoordinates[0]
    let cicle = value.subfield[0].cicle
    let id =  value.subfield[0].id
    if(cordi.lat == subfi.lat){
      this.verify = false
      if(cicle.length == 0){
        this.modalshow('@getbootstrap')
      }else{
        let url = '/Lotes/cicle/' + value.id+ '/' + id
        this.router.navigateByUrl(url);
      }
    }else {
      this.verify = true
    }
    
  }
  showmap(value){
    this.id = value
    this.mostrar = false
    this.LotsService.getLot(this.id).subscribe((resp: any) => {
     this.subloteSolo =  resp.subfield[0].id
      
      this.allLots = this.solomap(resp)
      this.verifylot(resp)
      console.log(resp)
      this.showlote = resp;
      this.zoom = 13
      this.mostrarsublotes = resp.subfield
      this.nestedPaths = resp.coordinates;
      this.lat = resp.coordinates[0].lat
      this.lng = resp.coordinates[0].lng
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
    console.log(jun);
    return jun
  }
  solomap(value){
    let jun = []
    for(let item of value.subfield){
      const arrays = item.subfieldCoordinates
      jun.push(arrays)
    }
    console.log(jun);
    return jun
  }

  
  datasublote(value,i) {
    this.allLots.splice(i,1)

    
    this.lat = value.subfieldCoordinates[0].lat
    this.lng = value.subfieldCoordinates[0].lng
      this.colorDemo1 = value.color;
      this.sublotesforms.setValue({
        _id:value.id,
        nickname: value.nickname,
        agriculture_type: value.agriculture_type,
        // start_date: value.start_date,
        // finish_date: value.finish_date,
        crops: value.crops.name
      });    
      this.pathsSubLotes = value.subfieldCoordinates;
      this.pathSub = [value.subfieldCoordinates]
  }
  sublote(value){   
    console.log("El id es"+this.id);
    if(this.id){
      if(value._id !== -1){
       const id = Number(this.id)
       let obj = {
         father_field:this.id,
         crops: {
           name: value.crops
         },
         agriculture_type: value.agriculture_type,
         cicle:[],
        //  start_date: value.start_date,
        //  finish_date: value.finish_date,
         color:this.colorDemo1,
         nickname: value.nickname,
         subfieldCoordinates: this.pathsSubLotes
       };
       this.colorDemo1 = value.color
       console.log("el objeto es");
       
       console.log(obj)
       this.LotsService.EditSublote(obj,value._id).subscribe(resp =>{
        this.getLot()
       }, err => {
         console.log("error");
         
       })
      }else{
        console.log("Agregar");
        const id = Number(this.id)
        let obj = {
          father_field:id,
          crops: {
            name: value.crops
          },
          agriculture_type: value.agriculture_type,
          // start_date: value.start_date,
          // finish_date: value.finish_date,
          color:this.colorDemo1,
          nickname: value.nickname,
          subfieldCoordinates: this.pathsSubLotes
        };
        this.colorDemo1 = value.color
        console.log(obj);
        this.LotsService.SubloteRegister(obj).subscribe(resp =>{
          this.getLot()
        })
      }
    }
  }
  backsubfield(){
      const num1 = this.pathsSubLotes.length - 1
      const num2 = this.pathsSubLotes.length - 2
      const num3 = this.pathsSubLotes.length - 3
      if(this.pathsSubLotes.length < 5){
       this.pathsSubLotes.splice(num1,1)  
       this.pathsSubLotes.splice(num2,1)  
        console.log("entro");
      }
      if(this.pathsSubLotes.length >= 5){
      this.pathsSubLotes.splice(num2,1)  
      this.pathsSubLotes.splice(num3,1) 
    }
  }
  clearform(){
    this.sublotesforms.setValue({
      _id: -1 ,
      agriculture_type: "",
      // start_date: "",
      // finish_date: "",
      nickname: "",
      crops: ""
    });
    this.pathsSubLotes = [];
  }
  Allpolygon(){
    this.verify = true
    this.mostrar = !this.mostrar
    this.LotsService.listLots().subscribe(resp => {
      this.allLots = this.allmaps(resp)
       this.listlots = resp;
       this.temp = resp;
       this.mostrarsublotes = []
     
     })
  }
  getsubfield(value){

  }
  onPolyClickLote($event,index){
  const value = this.listlots[index]
  this.showmap(value.id)
  }
  onPolyClickSublote(index){
  const value = this.showlote.subfield[index]
  this.datasublote(value,index)
  }
  getLot(){
    this.LotsService.getLot(this.id).subscribe((resp: any) => {
      this.allLots = this.solomap(resp)
      console.log(resp);
      this.showlote = resp
      this.newpaths = resp.coordinates;
      this.mostrarsublotes = resp.subfield
    })
  }
 
  ciclo(id, value,lote) {
    console.log("entro");
    
    console.log(value, id);
    console.log( lote.id);
    let url = '/Lotes/cicle/' + lote.id + '/' + id
    console.log(url);
    // this.router.navigateByUrl(url, id);
    
    if (value) {
      this.LotsService.CicleRegister(id, value).subscribe((resp: any) => {
     this.router.navigateByUrl(url);
      })
    }
  }
}




