import { UsernameValidator } from "./../../validators/UsernameValidator ";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AdminAgronodo } from "../../Services/admin-agronodo.service";
import { Uris } from "../../Services/Uris";
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";
import { AgricolaAgronodo } from "../../Services/agricola-agronodo.service";
import { AdminEngineerAgricola } from "../../Services/admin-engineer-agricola.service";
import { AdminAgricola } from "../../Services/admin-agricola.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  settingActive = 1;
  adminagronodo: FormGroup;
  agricola: FormGroup;
  Adminagricola: FormGroup;

  adminEngineers: FormGroup;

  role;
  dataUser: any = {};
  dataprofile: any = {};
  Url = Uris.API_ENDPOINT;
  filephoto: any = "";

  constructor(
    public profile: AdminAgronodo,
    public router: Router,
    public agricolaService: AgricolaAgronodo,
    private route: ActivatedRoute,
    public Engineer: AdminEngineerAgricola,
    public AdminAgricola: AdminAgricola
  ) {
    this.adminagronodo = new FormGroup({
      names: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.email, Validators.required]),
      phone: new FormControl("", Validators.required),
      username: new FormControl("", [
        Validators.required,
        UsernameValidator.cannotContainSpace,
      ]),
    });

    this.adminEngineers = new FormGroup({
      names: new FormControl("", Validators.required),
      phone: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.email, Validators.required]),
      username: new FormControl("", [
        Validators.required,
        UsernameValidator.cannotContainSpace,
      ]),
    });

    this.agricola = new FormGroup({
      name: new FormControl("", Validators.required),
      username: new FormControl("", [
        Validators.required,
        UsernameValidator.cannotContainSpace,
      ]),
      email: new FormControl("", [Validators.email, Validators.required]),
      address: new FormControl("", [Validators.required]),
      contactName: new FormControl("", Validators.required),
      phone: new FormControl("", [Validators.required]),
      highEngineers: new FormControl(false),
      highEngineersLenght: new FormControl(1),
      lots: new FormControl(false),
      lotsLenght: new FormControl(1),
      admin: new FormControl(false),
      adminLenght: new FormControl(1),
    });
    this.Adminagricola = new FormGroup({
      username: new FormControl("", [
        Validators.required,
        UsernameValidator.cannotContainSpace,
      ]),
      email: new FormControl("", [Validators.email, Validators.required]),
      contactName: new FormControl("", Validators.required),
      phone: new FormControl("", [Validators.required]),
    });
  }

  async ngOnInit() {
    console.log("init");
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.FetchData();
    }
  }
  ngAfterContentInit() {
    this.FetchData();
  }

  async FetchData() {
    await this.profile.getRefresh().subscribe((resp) => {
      this.dataUser = resp;
      switch (resp.user_type) {
        // Agronodo
        case 2: {
          this.role = 2;
          this.dataprofile = resp.profile;
          this.adminagronodo.setValue({
            names: resp.profile.names,
            username: resp.username,
            phone: resp.profile.phone,
            email: resp.email,
          });
          break;
        }
        //Admin agronodo
        case 3: {
          break;
        }
        //Agricola
        case 4: {
          this.role = 4;
          this.dataprofile = resp.profile;
          this.agricola.setValue({
            name: resp.profile.agricola,
            username: resp.username,
            email: resp.email,
            address: resp.profile.address,
            contactName: resp.profile.contactName,
            phone: resp.profile.phone,
            highEngineersLenght: resp.profile.prmsIngenieros,
            lotsLenght: resp.profile.prmsLotes,
            adminLenght: resp.profile.prmsAdminExtra,
            highEngineers: resp.profile.prmsIngenierosBool,
            lots: resp.profile.prmsLotesBool,
            admin: resp.profile.prmsAdminExtraBool,
          });
          break;
        }
        // Admin Agricola
        case 5: {
          this.role = 5;
          this.dataprofile = resp.profile;
          this.Adminagricola.setValue({
            username: resp.username,
            email: resp.email,
            contactName: resp.profile.names,
            phone: resp.profile.phone,
          });
          break;
        }
        //Admin Ingeniero
        case 6: {
          this.role = 6;
          this.dataprofile = resp.profile;
          this.adminEngineers.setValue({
            names: resp.profile.names,
            email: resp.email,
            phone: resp.profile.phone,
            username: resp.username,
          });
          break;
        }
        default: {
          break;
        }
      }
      return resp;
    });
  }
  setDataAgricola() {}
  fileChangeListener($event) {
    let image: any = new Image();
    let file: File = $event.target.files[0];
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.filephoto = btoa(binaryString); // Converting binary string data.
  }
  // Editar Agricola
  submitFormAgricola(value) {
    Swal.fire({
      text: "Guardar información",
      allowOutsideClick: false,
      width: "270px",
    });
    Swal.showLoading();
    if (this.filephoto == "") {
      let obj = {
        agricola: value.name,
        address: value.address,
        contactName: value.contactName,
        phone: value.phone,
        user: {},
      };
      let user = {
        user: {
          username: value.username,
        },
      };
      this.agricolaService.edit(obj, user).subscribe(
        (resp) => {
          Swal.fire({
            text: "Se Actualizó correctamente" + value.name,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            width: "250px",
          });
          this.router.navigateByUrl("/home");
        },
        (err: any) => {
          Swal.fire({
            text: "Error en el sevidor",
            showConfirmButton: false,
            timer: 1500,
            icon: "error",
            width: "250px",
          });
        }
      );
    } else {
      let obj = {
        photo: this.filephoto,
        agricola: value.name,
        address: value.address,
        contactName: value.contactName,
        phone: value.phone,
        user: {},
      };
      let user = {
        user: {
          username: value.username,
        },
      };
      this.agricolaService.edit(obj, user).subscribe(
        (resp) => {
          Swal.fire({
            text: "Se Actualizó correctamente" + value.name,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            width: "250px",
          });
          this.router.navigateByUrl("/home");
        },
        (err: any) => {
          Swal.fire({
            text: "Error en el sevidor",
            showConfirmButton: false,
            timer: 1500,
            icon: "error",
            width: "250px",
          });
        }
      );
    }
  }
  //Editar Admin Agronodo
  submitFormAdminAgronodo(value) {
    Swal.fire({
      text: "Guardar información",
      allowOutsideClick: false,
      width: "270px",
    });
    Swal.showLoading();
    if (this.filephoto == "") {
      let obj = {
        names: value.names,
        phone: value.photo,
        user: {},
      };
      let user = {
        user: {
          username: value.username,
        },
      };
      this.profile.edit(obj, user).subscribe(
        (resp) => {
          Swal.fire({
            text: "Se actualizó correctamente \n" + value.names,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            width: "250px",
          });
          this.router.navigateByUrl("/home");
        },
        (err: any) => {
          Swal.fire({
            text: "Error en el sevidor",
            showConfirmButton: false,
            timer: 1500,
            icon: "error",
            width: "250px",
          });
        }
      );
    } else {
      let obj = {
        names: value.names,
        phone: value.phone,
        photo: this.filephoto,
        user: {},
      };
      let user = {
        user: {
          username: value.username,
        },
      };
      this.profile.edit(obj, user).subscribe(
        (resp) => {
          Swal.fire({
            text: "Se actualizó correctamente" + value.names,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            width: "250px",
          });
          this.router.navigateByUrl("/home");
        },
        (err: any) => {
          Swal.fire({
            text: "Error en el sevidor",
            showConfirmButton: false,
            timer: 1500,
            icon: "error",
            width: "250px",
          });
        }
      );
    }
  }
  submitFormAdminEnginner(value) {
    console.log(value);
    if (this.filephoto == "") {
      let obj = {
        names: value.names,
        phone: value.phone,
      };
      let user = {
        user: {
          username: value.username,
        },
      };
      this.Engineer.edit(obj, user).subscribe(
        (resp) => {
          Swal.fire({
            text: "Se actualizó correctamente \n" + value.names,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            width: "250px",
          });
          this.router.navigateByUrl("/home");
        },
        (err: any) => {
          console.log(err._body);

          Swal.fire({
            text: "Error en el sevidor",
            showConfirmButton: false,
            timer: 1500,
            icon: "error",
            width: "250px",
          });
        }
      );
    } else {
      let obj = {
        names: value.names,
        phone: value.phone,
        photo: this.filephoto,
      };
      let user = {
        user: {
          username: value.username,
        },
      };
      console.log(obj);

      this.Engineer.edit(obj, user).subscribe(
        (resp) => {
          Swal.fire({
            text: "Se actualizó correctamente" + value.names,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            width: "250px",
          });
          this.router.navigateByUrl("/home");
        },
        (err: any) => {
          console.log(err._body);
          Swal.fire({
            text: "Error en el sevidor",
            showConfirmButton: false,
            timer: 1500,
            icon: "error",
            width: "250px",
          });
        }
      );
    }
  }
  submitFormAdminAgricola(value) {
    console.log(value);

    if (this.filephoto == "") {
      let obj = {
        names: value.contactName,
        phone: value.phone,
      };
      let user = {
        user: {
          username: value.username,
        },
      };
      this.AdminAgricola.edit(obj, user).subscribe(
        (resp) => {
          Swal.fire({
            text: "Se actualizó correctamente \n" + value.contactName,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            width: "250px",
          });
          this.router.navigateByUrl("/home");
        },
        (err: any) => {
          console.log(err._body);

          Swal.fire({
            text: "Error en el sevidor",
            showConfirmButton: false,
            timer: 1500,
            icon: "error",
            width: "250px",
          });
        }
      );
    } else {
      let obj = {
        names: value.contactName,
        phone: value.phone,
        photo: this.filephoto,
      };
      let user = {
        user: {
          username: value.username,
        },
      };
      console.log(obj);

      this.AdminAgricola.edit(obj, user).subscribe(
        (resp) => {
          Swal.fire({
            text: "Se actualizó correctamente" + value.contactName,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            width: "250px",
          });
          this.router.navigateByUrl("/home");
        },
        (err: any) => {
          console.log(err._body);
          Swal.fire({
            text: "Error en el sevidor",
            showConfirmButton: false,
            timer: 1500,
            icon: "error",
            width: "250px",
          });
        }
      );
    }
  }
}
