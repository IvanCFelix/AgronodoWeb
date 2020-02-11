import { AgricolaAgronodo } from '../../Services/agricola-agronodo.service';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ImageCropperComponent, CropperSettings, Bounds } from "ng2-img-cropper";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-agricola-edit-agronodo",
  templateUrl: "./agricola-edit-agronodo.component.html",
  styleUrls: ["./agricola-edit-agronodo.component.scss"]
})
export class AgricolaEditAgronodoComponent implements OnInit {
  colorDemo1 = "#389fd0";
  colorDemo2 = "#1255a7";
  colorDemo3 = "#555555";
  agricola: FormGroup;
  public filename: any = [];
  id;
  mostrar: boolean;
  photo: string;
  public files: any;
  public filestring: string = "";
  
  name: string;
  data1: any;
  cropperSettings: CropperSettings;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  constructor(private route: ActivatedRoute,public agricolaService:AgricolaAgronodo,public router:Router) {

    this.name = "Angular2";
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.width = 200;
    this.cropperSettings.height = 200;
    this.cropperSettings.croppedWidth = 200;
    this.cropperSettings.croppedHeight = 200;
    this.cropperSettings.canvasWidth = 300;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.minWidth = 100;
    this.cropperSettings.minHeight = 100;
    this.cropperSettings.cropperDrawSettings.strokeColor = "rgba(0,0,0,.25)";
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;

    this.cropperSettings.rounded = false;

    this.data1 = {};


    this.agricola = new FormGroup({
      name: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.email, Validators.required]),
      address: new FormControl("", [ Validators.required]),
      contactName: new FormControl("", Validators.required),
      phone: new FormControl("", [Validators.required]),
      highEngineers: new FormControl(false),
      highEngineersLenght: new FormControl(1),
      requests: new FormControl(false),
      lots: new FormControl(false),
      lotsLenght: new FormControl(1),
      admin: new FormControl(false),
      adminLenght: new FormControl(1),

    });

  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.id = id;
    if(id == null){
      console.log("Nueva Agroindustria")
    }
    if(id){
      console.log("Editar Agroindustria")
    }

  }

  submitForm(value: any) {
    Swal.fire({
      text: "Guardar información",
      allowOutsideClick: false,
      width: '270px'
    });
    Swal.showLoading();
    if (this.id == null) {
      this.create(value);
    } else {
      this.update(value);
    }
  }

  create(value){
    // let obj = {
    //   agroindustria:value.name,
    //   address:value.address ,
    //   contactName: value.contactName ,
    //   phone: value.phone,
    //   prmsAltaIngenieros: value.highEngineersLenght,
    //   prmsAtencionCliente: value.lots,
    //   prmsAdminExtras: value.adminLenght,
    //   user:  {
    //     username: value.username,
    //     email: value.email,
    //   }
    // }
    let obj = {
        logo: this.filestring,
        agricola: value.name,
        address: value.address,
        contactName: value.contactName,
        phone: value.phone,
        prmsIngenieros: value.highEngineersLenght,
        prmsLotes: value.lotsLenght,
        prmsAdminExtra:value.adminLenght,
        user:{
            username: value.username,
            email: value.email
        }
      }
      console.log(obj);
    this.agricolaService.register(obj).subscribe( resp =>{
      Swal.fire({
        title: "Se creó correctamente",
        icon: "success",
        text: value.name,
        showConfirmButton: false,
        timer: 1500,
        width: '270px'
      });
      this.router.navigateByUrl("/Agricola");
    })
  }

  update(value){

  }

  cropped(bounds: Bounds) {
    // console.log(bounds);
}

fileChangeListener($event) {
  this.mostrar = true;
  //base 64
  this.filename = $event.target.files[0];
  this.files = $event.target.files;
  var reader = new FileReader();
  reader.onload = this._handleReaderLoaded.bind(this);
  reader.readAsBinaryString(this.files[0]);



    let image: any = new Image();
    let file: File = $event.target.files[0];
    let myReader: FileReader = new FileReader();
    
    let that = this;
    myReader.onloadend = function(loadEvent: any) {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
}
_handleReaderLoaded(readerEvt) {
  var binaryString = readerEvt.target.result;
  this.filestring = btoa(binaryString); // Converting binary string data.
}
}
