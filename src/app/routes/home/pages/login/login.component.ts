import { SettingsService } from './../../../../core/settings/settings.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginAgronodo : FormGroup;

    constructor(public settings: SettingsService, fb: FormBuilder) {

        
       this.loginAgronodo = new FormGroup({
        email: new FormControl("",[Validators.email,Validators.required]),
        password: new FormControl("", Validators.required)
       })

    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        console.log(value);
    }

    ngOnInit() {

    }

}
