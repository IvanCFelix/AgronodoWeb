import { AuthService } from "./../../../../Services/login.service";
import { Router, ActivatedRoute } from "@angular/router";
import { SettingsService } from "./../../../../core/settings/settings.service";
import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginAgronodo: FormGroup;
  forgotpassword: FormGroup;
  url;
  navbarOpen = false;
  constructor(
    public settings: SettingsService,
    fb: FormBuilder,
    private modalService: BsModalService,
    public router: Router,
    public auth: AuthService,
    public route:ActivatedRoute
  ) {
    this.loginAgronodo = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", Validators.required),
    });
    this.forgotpassword = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    console.log(value);
  }

  ngOnInit() {
    localStorage.clear();
    const url:any = this.route.url;
 this.url = url.value[0].path;
    
  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  login(form) {
    Swal.fire({
      text: "Cargando información...",
      allowOutsideClick: false,
      width: "250px",
    });
    Swal.showLoading();
    if (form.invalid) {
      return;
    }
    this.auth.login(form.value).subscribe(
      (resp: any) => {
        if (resp.user_type === 7) {
          Swal.fire({
            text: "No tienes accesos a esta plataforma",
            showConfirmButton: false,
            timer: 1500,
            icon: "error",
            width: "250px",
          });
        } else {
          this.router.navigateByUrl("/home");
          Swal.close();
        }
      },
      (err: any) => {
        console.log(err);

        Swal.fire({
          text: err.error.non_field_errors[0],
          showConfirmButton: false,
          timer: 1500,
          icon: "error",
          width: "250px",
        });
      }
    );
  }
  Forgotpassword($ev, value: any) {
    if (this.forgotpassword.valid) {
      this.auth.recover(value).subscribe((resp) => {
        Swal.fire({
          title: "Se creó correctamente",
          icon: "success",
          text: value.name,
          showConfirmButton: false,
          timer: 1500,
        });
        this.modalService.hide(-1);
        console.log(resp);
      });
    }
  }
}
