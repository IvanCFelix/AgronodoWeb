import { BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { OnInit,ViewChild,Component } from "@angular/core";
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
  @ViewChild('Modal') public contentModal;
  public name:string;
  lotesForms: FormGroup;
  sololote:boolean = false
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
  allLots:any =[]
  nestedPaths = [];
  public polyline: Array<any>;
  public polylines: Array<any>;
  public maxSpeed: number;
  selectedMarker;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public lotService: LotsAgricolaService,
    private modalService:BsModalService

  ) {
    this.lotesForms = new FormGroup({
      name: new FormControl("", [Validators.required])
    });
    this.sublotesforms = new FormGroup({
      _id: new FormControl(-1),
      nickname: new FormControl("", Validators.required),
      crops: new FormControl("", Validators.required),
      // start_date: new FormControl(Date, Validators.required),
      // finish_date: new FormControl(Date, Validators.required),
      agriculture_type: new FormControl("", Validators.required)
    });
  }



  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const url = this.route.snapshot.paramMap.get('lot')
    this.url = url;
    this.id = id;
    if (id !== null) {
     
      this.lotService.getLot(id).subscribe((resp: any) => {
        this.sublotearray = resp.subfield;
        this.mostrarsublotes = resp.subfield
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

 
  }
 
  modalshow(value:string){
    this.name = value;
    this.contentModal.show();
  }
  allmaps(){
  
    let jun = []
    jun = this.newpaths
    return jun
  }
  confirmsublote(value){
    Swal.fire({
      title: 'Campos necesarios',
      text: "Si no se registran sublotes el lote se tomara como si fuera uno",
      icon: 'warning',
      confirmButtonText: 'Llenar información',
      showCancelButton: true,
      cancelButtonText:'Agregar sublotes',
      confirmButtonColor: '#27c24c',
    }).then((result) => {
      if(result.value){
        this.modalshow('@getbootstrap')
        this.allLots = this.allmaps()
        this.pathsSubLotes = this.allmaps()
        this.sololote = true
      }else{
        this.modalshow('@getbootstrap')
      }
    })
  }
  clear() {
    this.newpaths = [];
    this.nestedPaths = [];
  }
  clearsublote(){
    this.pathsSubLotes = []
    this.pathSub = []
  }
  clearform(){
    this.sololote = false
    this.pathsSubLotes = []
    this.pathSub = []
    this.sublotesforms.setValue({
      _id:0,
      agriculture_type: "",
      // start_date: "",
      // finish_date: "",
      nickname: "",
      crops: ""
    });
  }
  pol() {
   this.sololote = false
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

  Lotesub(){
    this.pathSub = this.nestedPaths
  }

  datasublote(value, p) {
    this.sololote = false
   
    this.colorDemo1 = value.color;
    this.sublotesforms.setValue({
      _id:p,
      nickname: value.nickname,
      agriculture_type: value.agriculture_type,
      // start_date: value.start_date,
      // finish_date: value.finish_date,
      crops: value.crops.name
    });    
    
    this.pathsSubLotes = value.subfieldCoordinates;
      this.pathSub = [value.subfieldCoordinates]
  }
  
  sublotenew(value){
    console.log(value);
    
    if(this.sublotesforms.value._id !== -1){
      let obj = {
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

      let pos = this.sublotesforms.value._id
      this.sublotearray[pos] = obj
    }else{
      let obj = {
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
        this.sublotearray.push(obj);
        let ara = {
          color:this.colorDemo1,
          subfieldCoordinates:this.pathsSubLotes
        }  
        this.mostrarsublotes.push(ara)

    }
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

  addMarker(lat: number, lng: number) {
    let obj = {
      lat: lat,
      lng: lng
    };
    this.newpaths.push(obj);
    if(this.newpaths.length == 3){
      let path = this.newpaths[0]
      this.newpaths.push(path)
    }
    if(this.newpaths.length > 4){
      this.newpaths.splice(this.newpaths.length - 2,1);
      let pos = this.newpaths.length - 1
      let uwu = this.newpaths[pos]
      this.newpaths.push(uwu)
      let path = this.newpaths[0]
      this.newpaths.push(path) 
    }
    const array: any[] = Array.of(this.newpaths);
    this.nestedPaths = array
   
  }
  addMakerSubLote(lat: number, lng: number) {
    if(this.sololote == false){
      let obj = {
        lat: lat,
        lng: lng
      };
      this.pathsSubLotes.push(obj);
  
      if(this.pathsSubLotes.length == 3){
        let path = this.pathsSubLotes[0]
        this.pathsSubLotes.push(path)  
      }
      if(this.pathsSubLotes.length > 4){
        this.pathsSubLotes.splice(this.pathsSubLotes.length - 2,1);
        let pos = this.pathsSubLotes.length - 1
        let uwu = this.pathsSubLotes[pos]
        this.pathsSubLotes.push(uwu)
        let path = this.pathsSubLotes[0]
        this.pathsSubLotes.push(path)
      }
      const array: any[] = Array.of(this.pathsSubLotes);
      this.pathSub = array;
    }
  }


  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude
    };
  }

  DeletesubloteNOID(value,p){
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
      }
      if(this.pathsSubLotes.length >= 5){
      this.pathsSubLotes.splice(num2,1)  
      this.pathsSubLotes.splice(num3,1) 
    }
  }
  submitsoloLote(value){
      this.sublotenew(value)
        let obj = {
          name: this.lotesForms.value.name,
          coordinates: this.newpaths,
          subfield: this.sublotearray
        };
        this.create(obj)
      
  }
}
