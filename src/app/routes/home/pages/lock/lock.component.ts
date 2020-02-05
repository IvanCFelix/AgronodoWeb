import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../../../Services/login.service';
import { CustomValidators } from 'ng2-validation';
import { SettingsService } from './../../../../core/settings/settings.service';
import { Component, OnInit, Injector } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    selector: 'app-lock',
    templateUrl: './lock.component.html',
    styleUrls: ['./lock.component.scss']
})
export class LockComponent implements OnInit {

    valForm: FormGroup;
    router: Router;
    user;
    token;

    constructor(public settings: SettingsService, fb: FormBuilder, public injector: Injector,public resetService:AuthService,private route: ActivatedRoute,
        ) {

        let password = new FormControl('', Validators.required);
        let certainPassword = new FormControl('', CustomValidators.equalTo(password));
        this.valForm = fb.group({
            // 'password': [null, Validators.required],

            'passwordGroup': fb.group({
                new_password1: password,
                new_password2: certainPassword
            })
        });
        
    }

   

    ngOnInit() {
        this.router = this.injector.get(Router);
        const user = this.route.snapshot.paramMap.get("user");
        this.user = user;
        console.log(user)
        const token = this.route.snapshot.paramMap.get("token");
        this.token = token;
        console.log(token)
    }


    submitForm(value: any) {
        if (this.valForm.valid) {
           
            let obj = {
                new_password1: value.passwordGroup.new_password1,
                new_password2: value.passwordGroup.new_password2,
                uid: this.user,
                token: this.token
            }

            try {
                this.resetService.setConfirm(obj).subscribe(resp =>{
                    this.router.navigate(['/login']);
               })
              }
              catch(error) {
                console.log(obj);
                this.resetService.reset(obj).subscribe(resp =>{
                     this.router.navigate(['/login']);
                })
              }


        }
    }

}
