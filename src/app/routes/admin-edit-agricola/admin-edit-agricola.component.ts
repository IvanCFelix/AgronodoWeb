import { Component, OnInit, ViewChild } from "@angular/core";
import { Uris } from "./../../Services/Uris";
import { UsernameValidator } from "./../../validators/UsernameValidator ";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ImageCropperComponent, CropperSettings, Bounds } from "ng2-img-cropper";
import Swal from "sweetalert2";
import { AdminAgricola } from "../../Services/admin-agricola.service";
@Component({
  selector: 'app-admin-edit-agricola',
  templateUrl: './admin-edit-agricola.component.html',
  styleUrls: ['./admin-edit-agricola.component.scss']
})
export class AdminEditAgricolaComponent implements OnInit {
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
    public admin: AdminAgricola,
    public router: Router) {

      this.adminagricola = new FormGroup({
        name: new FormControl("", Validators.required),
        email: new FormControl("", [Validators.email, Validators.required]),
        lastname: new FormControl("", Validators.required),
        phone: new FormControl("", [Validators.required]),
        username: new FormControl("", [Validators.required,UsernameValidator.cannotContainSpace]),
        prmsAltaIngenierosBool: new FormControl(false),
        prmsAltaIngenieros: new FormControl(1),
        prmsAgregarAdminBool: new FormControl(false),
        prmsAgregarAdmin: new FormControl(1),
        prmsAgregarLotesBool: new FormControl(false),
        prmsAgregarLotes: new FormControl(1),
  
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

    if (id) {
      this.admin.getadmin(id).subscribe((resp: any) => {
        console.log(resp);
        this.photo = resp.photo;
        this.mostrar = false;

        this.adminagricola.setValue({
          name: resp.names,
          email: resp.user.email,
          lastname: resp.lastnames,
          phone: resp.phone,
          username: resp.user.username,
          prmsAltaIngenierosBool:resp.prmsAltaIngenierosBool,
          prmsAltaIngenieros:resp.prmsAltaIngenieros,
          prmsAgregarLotesBool:resp.prmsAgregarLotesBool,
          prmsAgregarLotes:resp.prmsAgregarLotes,
          prmsAgregarAdminBool:resp.prmsAgregarAdminBool,
          prmsAgregarAdmin:resp.prmsAgregarAdmin
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
    user: {
      username: value.username,
      email: value.email
    },
    prmsAltaIngenierosBool:value.prmsAltaIngenierosBool,
    prmsAltaIngenieros:value.prmsAltaIngenieros,
    prmsAgregarLotesBool:value.prmsAgregarLotesBool,
    prmsAgregarLotes:value.prmsAgregarLotes,
    prmsAgregarAdminBool:value.prmsAgregarAdminBool,
    prmsAgregarAdmin:value.prmsAgregarAdmin

  };
  console.log(obj)
  this.admin.register(obj).subscribe(
    resp => {
      Swal.fire({
        text: "Se creó correctamente " + value.name,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        width: '250px'
      });
      this.router.navigateByUrl("/Admin-Agricola");
    },
    (err: any) => {
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
  if (this.filestring == "") {
    let obj = {
      names: value.name,
      lastnames: value.lastname,
      phone: value.number,
      user: {  },
      prmsAltaIngenierosBool:value.prmsAltaIngenierosBool,
      prmsAltaIngenieros:value.prmsAltaIngenieros,
      prmsAgregarLotesBool:value.prmsAgregarLotesBool,
      prmsAgregarLotes:value.prmsAgregarLotes,
      prmsAgregarAdminBool:value.prmsAgregarAdminBool,
      prmsAgregarAdmin:value.prmsAgregarAdmin
    };
    let user = {
      user: {
        username: value.username
      }
    };
    this.admin.edit(obj, user).subscribe(
      resp => {
        Swal.fire({
          text: "Se actualizó correctamente \n"+value.name,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          width: '250px'
        });
        this.router.navigateByUrl("/Admin-Agricola");
      },
      (err: any) => {
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
      user: {},
      prmsAltaIngenierosBool:value.prmsAltaIngenierosBool,
      prmsAltaIngenieros:value.prmsAltaIngenieros,
      prmsAgregarLotesBool:value.prmsAgregarLotesBool,
      prmsAgregarLotes:value.prmsAgregarLotes,
      prmsAgregarAdminBool:value.prmsAgregarAdminBool,
      prmsAgregarAdmin:value.prmsAgregarAdmin
    };
    let user = {
      user: {
        username: value.username
      }
    };
    this.admin.edit(obj, user).subscribe(
      resp => {
        Swal.fire({
          text: "Se actualizó correctamente" + value.names,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          width: '250px'
        });
        this.router.navigateByUrl("/Admin-Agricola");
      },
      (err: any) => {
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
