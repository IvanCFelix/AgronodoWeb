import { AdminEngineerAgricola } from './../../Services/admin-engineer-agricola.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { Uris } from "./../../Services/Uris";
import { UsernameValidator } from "./../../validators/UsernameValidator ";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ImageCropperComponent, CropperSettings, Bounds } from "ng2-img-cropper";
import Swal from "sweetalert2";
import { AdminAgricola } from "../../Services/admin-agricola.service";
@Component({
  selector: 'app-admin-edit-engineer',
  templateUrl: './admin-edit-engineer.component.html',
  styleUrls: ['./admin-edit-engineer.component.scss']
})
export class AdminEditEngineerComponent implements OnInit {
  id;
  adminagricola: FormGroup;
  mostrar: boolean;
  photo: string;
  name: string;
  data1: any;
  public files: any;
  public filestring: string = "";
  public filename: any = [];
  public url = Uris.API_ENDPOINT;
  cropperSettings: CropperSettings;
  @ViewChild("cropper", undefined) cropper: ImageCropperComponent;
  constructor(    
    private route: ActivatedRoute,
    public Engineer: AdminEngineerAgricola,
    public router: Router) {

      this.adminagricola = new FormGroup({
        name: new FormControl("", Validators.required),
        lastname: new FormControl("", Validators.required),
        phone: new FormControl("", [Validators.required]),
        email: new FormControl("", [Validators.email, Validators.required]),
        username: new FormControl("", [Validators.required,UsernameValidator.cannotContainSpace]),
        canSeeReports: new FormControl(false),
        canEditEngineers: new FormControl(false),
        canAddField: new FormControl(false),
        role: new FormControl("", Validators.required)
  
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
    console.log(id);
    if (id) {
      this.Engineer.getadmin(id).subscribe((resp: any) => {
        console.log(resp);
    
        
        this.photo = resp.photo;
        this.mostrar = false;

        this.adminagricola.setValue({
          name: resp.names,
          email: resp.user.email,
          lastname: resp.lastnames,
          phone: resp.phone,
          username: resp.user.username,
          canSeeReports:resp.canSeeReports,
          canAddField:resp.canAddField,
          canEditEngineers:resp.canEditEngineers,
          role:resp.role.name
        });
      });
    } else {
      this.mostrar = true;
    
  }
}


register(value: any) {
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

create(value: any) {
  let obj = {
    names: value.name,
    lastnames: value.lastname,
    phone: value.phone,
    photo: this.filestring,
    role:{
      name:value.role
    },
    user: {
      username: value.username,
      email: value.email
    },
    canSeeReports:value.canSeeReports,
    canAddField:value.canAddField,
    canEditEngineers:value.canEditEngineers,

  };
  console.log(obj)
  this.Engineer.register(obj).subscribe(
    resp => {
      Swal.fire({
        text: "Se creó correctamente " + value.name,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        width: '250px'
      });
      this.router.navigateByUrl("/Admin-Ingeniero");
    },
    (err: any) => {
      console.log(err);
      
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
update(value: any) {
  console.log(value);
  if (this.filestring == "" ) {
    let obj = {
      names: value.name,
      lastnames: value.lastname,
      phone: value.phone,
      role:{
        name:value.name
       },
      canSeeReports:value.canSeeReports,
      canAddField:value.canAddField,
      canEditEngineers:value.canEditEngineers,
    };
    let user = {
      user: {
        username: value.username
      }
    };
    this.Engineer.edit(obj, user).subscribe(
      resp => {
        Swal.fire({
          text: "Se actualizó correctamente \n"+value.name,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          width: '250px'
        });
        this.router.navigateByUrl("/Admin-Ingeniero");
      },
      (err: any) => {
        console.log(err._body);
        
        Swal.fire({
          text: "Error en el sevidor",
          showConfirmButton: false,
          timer: 1500,
          icon:'error',
          width: '250px'
        });
      }
    );
  } else {
    let obj = {
      names: value.name,
      lastnames: value.lastname,
      phone: value.number,
      photo: this.filestring,
      role:{
        name:value.role
      },
      canSeeReports:value.canSeeReports,
      canAddField:value.canAddField,
      canEditEngineers:value.canEditEngineers,
    };
    let user = {
      user: {
        username: value.username
      }
    };
      console.log(obj);

    this.Engineer.edit(obj, user).subscribe(
      resp => {
        Swal.fire({
          text: "Se actualizó correctamente" + value.names,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          width: '250px'
        });
        this.router.navigateByUrl("/Admin-Ingeniero");
      },
      (err: any) => {
        console.log(err._body)
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
}



setRoundedMethod(value: boolean) {
  this.cropperSettings.rounded = value;
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
