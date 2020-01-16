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

@Component({
  selector: "app-agroindustrias-edit-agronodo",
  templateUrl: "./agroindustrias-edit-agronodo.component.html",
  styleUrls: ["./agroindustrias-edit-agronodo.component.scss"]
})
export class AgroindustriasEditAgronodoComponent implements OnInit {
  colorDemo1 = "#389fd0";
  colorDemo2 = "#1255a7";
  colorDemo3 = "#555555";
  adminagronodo: FormGroup;
  
  name: string;
  data1: any;
  cropperSettings: CropperSettings;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  constructor() {
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


    this.adminagronodo = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.email, Validators.required]),
      name_contact: new FormControl("", Validators.required),
      number: new FormControl("", [Validators.required]),
      requests: new FormControl(false),
      family: new FormControl(false),
      highEngineers: new FormControl(false),
      Support: new FormControl(false),
      admin: new FormControl(false)
    });

  }
  ngOnInit() {}

  submitForm($ev, value: any) {
    let obj = {
      name: value.name,
      email: value.email,
      name_contact: value.name_contact,
      number: value.number,
      primary:this.colorDemo1,
      secondary:this.colorDemo2,
      terc:this.colorDemo3,
      permisos: [
        value.requests,
        value.family,
        value.highEngineers,
        value.Support,
        value.admin
      ]
    };
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
