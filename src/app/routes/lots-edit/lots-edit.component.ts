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
  example: any = [];
  mostrar: boolean = true;
  id ;
  sublotearray = [];
  colorDemo1 = "#389fd0";
  lat: number = 25.8132204;
  lng: number = -108.9858821;
  zoom: number = 14;
  polygon: any;
  scrollwheel = false;
  newpaths:any = [];
  pathsSubLotes = [];
  pathSub =[];
  mostrarsublotes = [];
  paths = [];
  nestedPaths = [
    
    //   [
    //   { lat: 25.80317630952905, lng: -108.98491032228453 },
    //   { lat: 25.801746752090914, lng: -108.98598320589049 },
    //   { lat: 25.79966034001631, lng: -108.98233540163024 },
    //   { lat: 25.801012648326893, lng: -108.9811766873358 },
    //   { lat: 25.80317630952905, lng: -108.98491032228453 },
    //   ],[
    //   { lat: 25.81224822827475, lng: -108.98349946020446 },
    //   { lat: 25.81417988733787, lng: -108.98959343908629 },
    //   { lat: 25.811398288307792, lng: -108.99216835974059 },
    //   { lat: 25.808500719863055, lng: -108.98663228033385 },
    //   { lat: 25.81224822827475, lng: -108.98349946020446 },

    // ]
  ];
  public polyline: Array<any>;
  public polylines: Array<any>;
  public maxSpeed: number;
  selectedMarker;
  constructor(
    private modalService: BsModalService,
    public router: Router,
    private route: ActivatedRoute,
    public lotService: LotsAgricolaService
  ) {
    this.lotesForms = new FormGroup({
      name: new FormControl("", [Validators.required])
    });
    this.sublotesforms = new FormGroup({
      nickname: new FormControl("", Validators.required),
      crops: new FormControl("", Validators.required),
      start_date: new FormControl(Date, Validators.required),
      finish_date: new FormControl(Date, Validators.required),
      agriculture_type: new FormControl("", Validators.required)
    });
  }



  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id;
    if (id) {
     
      this.lotService.getLot(id).subscribe((resp: any) => {
        this.sublotearray = resp.subfield;
        this.newpaths = resp.coordinates;
        const array: any[] = Array.of(this.newpaths);
        this.nestedPaths = array
          for (let item of resp.subfield) {
            this.mostrarsublotes.push(item.subfieldCoordinates)
        }
  

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
    console.log("entro");
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
    this.sublotesforms.setValue({
      agriculture_type: "",
      start_date: "",
      finish_date: "",
      nickname: "",
      crops: ""
    });
  }
  pol() {
    // console.log(this.newpaths);
    // this.pathsSubLotes = [];
    // let obj = [
    //   [
    //     { lat: 25.80317630952905, lng: -108.98491032228453 },
    //     { lat: 25.801746752090914, lng: -108.98598320589049 },
    //     { lat: 25.79966034001631, lng: -108.98233540163024 },
    //     { lat: 25.801012648326893, lng: -108.9811766873358 }
    //   ],
    //   [
    //     { lat: 25.81224822827475, lng: -108.98349946020446 },
    //     { lat: 25.81417988733787, lng: -108.98959343908629 },
    //     { lat: 25.811398288307792, lng: -108.99216835974059 },
    //     { lat: 25.808500719863055, lng: -108.98663228033385 }
    //   ]
    // ];
    // // this.nestedPaths.push(obj);

    // console.log(this.nestedPaths);
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
          text: "Error en el sevidor",
          showConfirmButton: false,
          timer: 1500,
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

  datasublote(value) {
    this.colorDemo1 = value.color;
    console.log(value);
    this.sublotesforms.setValue({
      nickname: value.nickname,
      agriculture_type: value.agriculture_type,
      start_date: value.start_date,
      finish_date: value.finish_date,
      crops: value.crops.name
    });
    this.pathsSubLotes = value.subfieldCoordinates;
    this.pathSub = [value.subfieldCoordinates]
  }
  
  sublote(value) {
    if(this.id){
      const id = Number(this.id)
      let obj = {
        father_field:id,
        crops: {
          name: value.crops
        },
        agriculture_type: value.agriculture_type,
        start_date: value.start_date,
        finish_date: value.finish_date,
        color:"#FFFFE0",
        nickname: value.nickname,
        subfieldCoordinates: this.pathsSubLotes
      };
      console.log(obj);
      this.sublotearray.push(obj);
      this.lotService.SubloteRegister(obj).subscribe(resp =>{
        console.log("entro")
        console.log(resp)
      })
      this.mostrarsublotes.push(this.pathsSubLotes)
      console.log(this.mostrarsublotes)

    }else{
      let obj = {
        crops: {
          name: value.crops
        },
        agriculture_type: value.agriculture_type,
        start_date: value.start_date,
        finish_date: value.finish_date,
        color:"#FFFFE0",
        nickname: value.nickname,
        subfieldCoordinates: this.pathsSubLotes
      };
      this.sublotearray.push(obj);
      this.mostrarsublotes.push(this.pathsSubLotes)

    }

    // this.nestedPaths.push(array)
    // this.pathSub.push(array)
    this.sublotesforms.setValue({
      agriculture_type: "",
      start_date: "",
      finish_date: "",
      nickname: "",
      crops: ""
    });
    this.pathsSubLotes = [];
  }

  onMapReady(map) {
    
    this.initDrawingManager(map);
  }

  initDrawingManager(map: any) {
    console.log(map)
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ["polygon"]
      },
      polygonOptions: {
        draggable: true,
        editable: true,
        strokeColor: "green",
        strokeOpacity: 2,
        fillOpacity: 0.2
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    };

    const drawingManager = new google.maps.drawing.DrawingManager(options);
    console.log(drawingManager)
    drawingManager.setMap(map);
  }

  options: any = {
    lat: 33.5362475,
    lng: -111.9267386,
    zoom: 10,
    fillColor: "#DC143C",
    draggable: true,
    editable: true,
    visible: true
  };



  getPaths() {
    if (this.polygon) {
      const vertices = this.polygon.getPaths().getArray()[0];
      let paths = [];

      vertices.getArray().forEach(function(xy, i) {
        // console.log(xy);
        let latLng = {
          lat: xy.lat(),
          lng: xy.lng()
        };
        paths.push(JSON.stringify(latLng));
      });
      return paths;
    }
    return [];
  }

 
  men() {
    console.log("entro");
  }

  addMarker(lat: number, lng: number) {
    // console.log(lat);
    // console.log(lng);

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
    console.log(lat);
    console.log(lng);

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

  max(coordType: "lat" | "lng"): number {
    return Math.max(...this.newpaths.map(marker => marker[coordType]));
  }

  min(coordType: "lat" | "lng"): number {
    return Math.min(...this.newpaths.map(marker => marker[coordType]));
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
            const array: any[] = Array.of(this.newpaths);
            this.nestedPaths = array
              for (let item of resp.subfield) {
                this.mostrarsublotes.push(item.subfieldCoordinates)
            }
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


}
