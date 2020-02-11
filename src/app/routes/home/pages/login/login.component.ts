import { AuthService } from "./../../../../Services/login.service";
import { Router } from "@angular/router";
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
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginAgronodo: FormGroup;
  forgotpassword: FormGroup;

  constructor(
    public settings: SettingsService,
    fb: FormBuilder,
    private modalService: BsModalService,
    public router: Router,
    public auth: AuthService
    ) {
    this.loginAgronodo = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", Validators.required)
    });
    this.forgotpassword = new FormGroup({
      email: new FormControl("", [Validators.required,Validators.email]),
  
    });
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    console.log(value);
  }


  

  ngOnInit() {
    localStorage.clear();
  }


  login( form) {    
    Swal.fire({
      text: "Cargando información...",
      allowOutsideClick: false,
      width: '250px'
    });
    Swal.showLoading();
    if (form.invalid) {
      return;
    }
    this.auth.login(form.value).subscribe(
      (resp: any) => {
        Swal.close();
        this.router.navigateByUrl("/home");

      },
      err => {
        console.log("entro")
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
  Forgotpassword($ev, value: any) {
    if (this.forgotpassword.valid) {
     this.auth.recover(value).subscribe(resp => {
        Swal.fire({
            title: "Se creó correctamente",
            icon: "success",
            text: value.name,
            showConfirmButton: false,
            timer: 1500
          });
          this.modalService.hide(-1)        
           console.log(resp)
     })
    }
}


}
