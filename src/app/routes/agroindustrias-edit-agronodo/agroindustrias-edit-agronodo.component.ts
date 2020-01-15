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
  constructor() {
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
}
