import { AuthService } from './../../../../Services/login.service';
import { Router } from '@angular/router';
import { SettingsService } from './../../../../core/settings/settings.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginAgronodo : FormGroup;

    constructor(public settings: SettingsService,public router: Router , public auth:AuthService) {

        
       this.loginAgronodo = new FormGroup({
        email: new FormControl("",[Validators.email,Validators.required]),
        password: new FormControl("", Validators.required)
       })

    }

  

    ngOnInit() {

    }
    login(event, form) {
        if (form.invalid) {
          return;
        }
        this.auth.login(form).subscribe(
          (resp: any) => {
            this.router.navigateByUrl("/dashboard/v1");
          },
          ((err) =>{     
           console.log(err)
          })
        );
      }
    

}
