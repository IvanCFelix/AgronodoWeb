import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from "ng2-validation";
import {FormBuilder,FormGroup,Validators,FormControl} from "@angular/forms";
import { Component, OnInit,ViewChild } from "@angular/core";
import { ImageCropperComponent,CropperSettings,Bounds} from "ng2-img-cropper";

@Component({
  selector: "app-admin-edit-agronodo",
  templateUrl: "./agricola-edit.component.html",
  styleUrls: ["./agricola-edit.component.scss"]
})
export class AgricolaEditComponent implements OnInit {
  agricolaEdit: FormGroup;
  name: string;
  data1: any;
  id: String;
  public files: any;
  public filestring: string = "";
  public filename: any = [];

  cropperSettings: CropperSettings;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  
  constructor(private route: ActivatedRoute) {
    this.agricolaEdit = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.email, Validators.required]),
      lastname: new FormControl("", Validators.required),
      number: new FormControl("", [Validators.required])
    });

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
  }

  ngOnInit() {
  
    const id = this.route.snapshot.paramMap.get("id");
     this.id = id;
    
    if(id == null){
      console.log("Nueva Agricola",this.id)
    }
    if(id){
      console.log("Editar Agricola ")
    }
  }

  submitForm($ev, value: any) {
    console.log(value);
  }
  setRoundedMethod(value: boolean) {
    this.cropperSettings.rounded = value;
}

cropped(bounds: Bounds) {
    // console.log(bounds);
}

fileChangeListener($event) {
  //base 64 
  this.filename = $event.target.files[0];
  this.files = $event.target.files;
  var reader = new FileReader();
  reader.onload = this._handleReaderLoaded.bind(this);
  reader.readAsBinaryString(this.files[0]);
  
//codigo para seleccionar la imagen y mandarla al input 
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

