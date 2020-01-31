import { AgroindustriaAgronodo } from '../../Services/agroindustria-agronodo.service';
import { CustomValidators } from "ng2-validation";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ImageCropperComponent,
  CropperSettings,
  Bounds
} from "ng2-img-cropper";
import { ActivatedRoute, Router } from "@angular/router";

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
  
  name: string;
  data1: any;
  cropperSettings: CropperSettings;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  constructor(private route: ActivatedRoute,public agroindustriaService:AgroindustriaAgronodo,public router:Router) {

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
      highEngineersLenght: new FormControl(false),
      requests: new FormControl(false),
      lots: new FormControl(false),
      lotsLenght: new FormControl(false),
      admin: new FormControl(false),
      adminLenght: new FormControl(false),

    });

  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");

    if(id == null){
      console.log("Nueva Agroindustria")
    }
    if(id){
      console.log("Editar Agroindustria")
    }

  }

  submitForm(value: any) {
  

    let obj = {
      agroindustria:value.name,
      address:value.address ,
      contactName: value.contactName ,
      phone: value.phone,
      prmsAltaIngenieros: value.highEngineersLenght,
      prmsAtencionCliente: value.lots,
      prmsAdminExtras: value.adminLenght,
      user:  {
        username: value.username,
        email: value.email,
        password: "micontra"
      }
    }

    this.agroindustriaService.register(obj).subscribe( resp =>{
      this.router.navigateByUrl("/Agricola");
    })
    console.log(obj);
  }
  cropped(bounds: Bounds) {
    // console.log(bounds);
}

fileChangeListener($event) {
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
}
