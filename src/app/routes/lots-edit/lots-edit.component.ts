import { BsModalService } from "ngx-bootstrap/modal";
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import Swal from "sweetalert2";
import { LotsAgricolaService } from "../../Services/lots-agricola.service";
declare const google: any;

@Component({
  selector: "app-lots-edit",
  templateUrl: "./lots-edit.component.html",
  styleUrls: ["./lots-edit.component.scss"]
})
export class LotsEditComponent implements OnInit {
  lotesForms: FormGroup;
  sublotesforms: FormGroup;
  indice:number;
  example: any = [];
  mostrar: boolean = true;
  id;
  url;
  edit = false;
  sublotearray = [];
  colorDemo1 = "";
  lat: number = 25.8132204;
  lng: number = -108.9858821;
  zoom: number = 14;
  polygon: any;
  scrollwheel = false;
  newpaths:any = [];
  pathsSubLotes = [];
  pathSub =[];
  mostrarsublotes:any = [];
  paths = [];
  nestedPaths = [];
  public polyline: Array<any>;
  public polylines: Array<any>;
  public maxSpeed: number;
  selectedMarker;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public lotService: LotsAgricolaService
  ) {
    this.lotesForms = new FormGroup({
      name: new FormControl("", [Validators.required])
    });
    this.sublotesforms = new FormGroup({
      _id: new FormControl(-1),
      nickname: new FormControl("", Validators.required),
      crops: new FormControl("", Validators.required),
      start_date: new FormControl(Date, Validators.required),
      finish_date: new FormControl(Date, Validators.required),
      agriculture_type: new FormControl("", Validators.required)
    });
  }



  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const url = this.route.snapshot.paramMap.get('lot')
    this.url = url;
    
    this.id = id;
    if (id) {
     
      this.lotService.getLot(id).subscribe((resp: any) => {
        this.sublotearray = resp.subfield;
        this.mostrarsublotes = resp.subfield
        console.log(resp)
        this.lat = resp.coordinates[0].lat
        this.lng = resp.coordinates[0].lng
        
        this.newpaths = resp.coordinates;
        const array: any[] = Array.of(this.newpaths);
        this.nestedPaths = array
        //   for (let item of resp.subfield) {
        //     this.mostrarsublotes.push(item.subfieldCoordinates)
        // }
  

        this.lotesForms.setValue({
          name: resp.name
        });
      });
    }
    this.polyline = [
  
  ]
  this.polylines = this.rebuildPolylines();


 
  }
  private rebuildPolylines() {
    let polylines = [];
    let i = 0;
    let newPolyline = {path: [], color: 'blue'};
    for (let point of this.polyline) {
      console.log(point)
      newPolyline.path.push(point);
      const speedChanged = this.polyline[i+1] && (point.speed < this.maxSpeed && this.polyline[i+1].speed < this.maxSpeed) ||(point.speed > this.maxSpeed && this.polyline[i+1].speed > this.maxSpeed )
      if (point.speed > this.maxSpeed) {
        newPolyline.color = 'red';
      }
      if (speedChanged) {
        newPolyline.path.push( this.polyline[i+1] );
        polylines.push(newPolyline);
        newPolyline = {path: [], color: 'green'};
      }
      i++;
    }
    return polylines;
    
  }
  clear() {
    this.newpaths = [];
    this.nestedPaths = [];
  }
  clearsublote(){
    this.pathsSubLotes = []
    this.pathSub = []
  }
  savepath() {
    if (this.mostrar == true) {
      this.mostrar = false;
    } else {
      this.mostrar = true;
    }
  }
  clearform(){
    this.pathsSubLotes = []
    this.pathSub = []
    this.sublotesforms.setValue({
      _id:0,
      agriculture_type: "",
      start_date: "",
      finish_date: "",
      nickname: "",
      crops: ""
    });
  }
  pol() {
    this.edit = true;
   this.lat = this.newpaths[0].lat
   this.lng = this.newpaths[0].lng
  }

  register(value: any) {
    Swal.fire({
      text: "Guardar información",
      allowOutsideClick: false,
      width: "270px"
    });
    Swal.showLoading();
    if (this.id == null) {
    console.log(this.id);
    
       this.create(value);
    } else {
      this.update(value);
    }
  }

  create(value: any) {
    let obj = {
      name: value.name,
      coordinates: this.newpaths,
      subfield: this.sublotearray
    };
    console.log(obj);
    this.lotService.register(obj).subscribe(
      resp => {
        Swal.fire({
          text: "Se creó correctamente " + value.name,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          width: '250px'
        });
        this.router.navigateByUrl("/Lotes");
      },
      (err: any) => {
        console.log(err)
        Swal.fire({
          text: err._body,
          showConfirmButton: true,
          icon:'error',
          width: '250px'
        });
      }
    );
  }

  update(value){
  const id = Number(this.id)
    let obj = {
      id:id,
      coordinates: this.newpaths,
      // subfield: this.sublotearray,
      subfield:[],
      name: value.name,
    };           
      console.log(obj)
      this.lotService.edit(obj, this.id).subscribe(
        resp => {
          Swal.fire({
            text: "Se Actualizó correctamente "+ value.name,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            width: '250px'
          });
          this.router.navigateByUrl("/Lotes");
        },
        (err: any) => {
          // Swal.fire({
          //   text: "Error en el sevidor",
          //   showConfirmButton: false,
          //   timer: 1500,
          //   icon:'error',
          //   width: '250px'
          // });
        }
      );
    

  }

  datasublote(value, p) {
    if(value){
     if(this.id){
       this.edit = true;
       this.colorDemo1 = value.color;
       this.sublotesforms.setValue({
         _id:value.id,
         nickname: value.nickname,
         agriculture_type: value.agriculture_type,
         start_date: value.start_date,
         finish_date: value.finish_date,
         crops: value.crops.name
       });
       this.pathsSubLotes = value.subfieldCoordinates;
       this.pathSub = [value.subfieldCoordinates]
     }else{
      this.colorDemo1 = value.color;
      this.sublotesforms.setValue({
        _id:p,
        nickname: value.nickname,
        agriculture_type: value.agriculture_type,
        start_date: value.start_date,
        finish_date: value.finish_date,
        crops: value.crops.name
      });
     console.log(this.sublotesforms.value._id);
    
      this.pathsSubLotes = value.subfieldCoordinates;
      this.pathSub = [value.subfieldCoordinates]
     }
    }
  }
  
  sublotenew(value){
    if(this.sublotesforms.value._id !== -1){
      let obj = {
        crops: {
          name: value.crops
        },
        agriculture_type: value.agriculture_type,
        start_date: value.start_date,
        finish_date: value.finish_date,
        color:this.colorDemo1,
        nickname: value.nickname,
        subfieldCoordinates: this.pathsSubLotes
      };

      let pos = this.sublotesforms.value._id
      this.sublotearray[pos] = obj
    }else{
      let obj = {
          crops: {
            name: value.crops
          },
          agriculture_type: value.agriculture_type,
          start_date: value.start_date,
          finish_date: value.finish_date,
          color:this.colorDemo1,
          nickname: value.nickname,
          subfieldCoordinates: this.pathsSubLotes
        };
        this.sublotearray.push(obj);
     
        let ara = {
          color:this.colorDemo1,
          subfieldCoordinates:this.pathsSubLotes
        }
        
        this.mostrarsublotes.push(ara)
        console.log(this.mostrarsublotes);
    }
    this.sublotesforms.setValue({
      _id: -1 ,
      agriculture_type: "",
      start_date: "",
      finish_date: "",
      nickname: "",
      crops: ""
    });
    this.pathsSubLotes = [];
  }
  sublote(value) {
    if(this.id){
      if(value._id !== -1){
       const id = Number(this.id)
       let obj = {
         father_field:this.id,
         crops: {
           name: value.crops
         },
         agriculture_type: value.agriculture_type,
         start_date: value.start_date,
         finish_date: value.finish_date,
         color:this.colorDemo1,
         nickname: value.nickname,
         subfieldCoordinates: this.pathsSubLotes
       };
       this.colorDemo1 = value.color
       console.log(obj)
       this.lotService.EditSublote(obj,value._id).subscribe(resp =>{
         this.lotService.getLot(this.id).subscribe((resp: any) => {
           console.log(resp);
           this.sublotearray = resp.subfield;
           this.newpaths = resp.coordinates;
           this.mostrarsublotes = resp.subfield
         })
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
          start_date: value.start_date,
          finish_date: value.finish_date,
          color:this.colorDemo1,
          nickname: value.nickname,
          subfieldCoordinates: this.pathsSubLotes
        };
        this.colorDemo1 = value.color
        console.log(obj);
        this.lotService.SubloteRegister(obj).subscribe(resp =>{
          this.lotService.getLot(this.id).subscribe((resp: any) => {
            console.log(resp);
            
            this.sublotearray = resp.subfield;
            this.newpaths = resp.coordinates;
            this.mostrarsublotes = resp.subfield
          })
        })

  
      }
     
      // this.mostrarsublotes.push(this.pathsSubLotes)

    }
    this.sublotesforms.setValue({
      _id: -1 ,
      agriculture_type: "",
      start_date: "",
      finish_date: "",
      nickname: "",
      crops: ""
    });
    this.pathsSubLotes = [];
  }

 



 
  men() {
    console.log("entro");
  }

  addMarker(lat: number, lng: number) {
    let obj = {
      lat: lat,
      lng: lng
    };
    
    this.newpaths.push(obj);
    console.log(this.newpaths);
    

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
       
      // let pos = this.newpaths.length - 1
      // console.log(this.newpaths);

      // let path = this.newpaths[0]
      // this.newpaths.push(path)
      // let pos = this.newpaths.length 


      // this.newpaths.splice(pos,1);
      // let path2 = this.newpaths[0]
      // this.newpaths.push(path2)
        
    //  this.newpaths[pos]
  
 
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


  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude
    };
  }

  markerDragEnd(coords, event) {
    console.log(coords);
    console.log(event);
  }
  
  deleteSublote(value){
    console.log(value)
    Swal.fire({
      title: 'Seguro que quieres eliminar a',
      text: value.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.value) {
        this.lotService.deleteSub(value.id)
        .subscribe( resp => {
          this.lotService.getLot(this.id).subscribe((resp: any) => {
            this.sublotearray = resp.subfield;
            this.newpaths = resp.coordinates;
            this.mostrarsublotes = resp.subfield
          })

        })
      }
    })
  }

  DeletesubloteNOID(value,p){
    console.log(value)
    const control = this.sublotearray
    const controlsublote = this.mostrarsublotes

    Swal.fire({
      title: 'Seguro que quieres eliminar a',
      text: value.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.value) {
        control.splice(p,1);
        controlsublote.splice(p,1)
      }
    })
  }
  back(){
      const num1 = this.newpaths.length - 1
      const num2 = this.newpaths.length - 2
      const num3 = this.newpaths.length -3
      if(this.newpaths.length < 5){
       this.newpaths.splice(num1,1)  
       this.newpaths.splice(num2,1)  
        console.log("entro");
      }
      if(this.newpaths.length >= 5){
      this.newpaths.splice(num2,1)  
      this.newpaths.splice(num3,1) 
    }
  }
  backsubfield(){
    
    const num1 = this.pathsSubLotes.length - 1
      const num2 = this.pathsSubLotes.length - 2
      const num3 = this.pathsSubLotes.length -3
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
}
