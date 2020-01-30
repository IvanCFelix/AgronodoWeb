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

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginAgronodo: FormGroup;

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
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    console.log(value);
  }
  

  ngOnInit() {

  }


  login( form) {    
    if (form.invalid) {
      return;
    }
    this.auth.login(form.value).subscribe(
      (resp: any) => {
        this.router.navigateByUrl("/home");

      },
      err => {
        
      }
    );
  }


}
