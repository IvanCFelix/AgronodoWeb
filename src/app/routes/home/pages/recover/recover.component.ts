import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AuthService } from './../../../../Services/login.service';
import { SettingsService } from './../../../../core/settings/settings.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import Swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
    selector: 'app-recover',
    templateUrl: './recover.component.html',
    styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {


    valForm: FormGroup;

    constructor(public settings: SettingsService, fb: FormBuilder,public recover:AuthService,public router:Router,private modalService: BsModalService) {
        this.valForm = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])]
        });
    }

    submitForm($ev, value: any) {
        if (this.valForm.valid) {
         this.recover.recover(value).subscribe(resp => {
            Swal.fire({
                title: "Correo enviado",
                icon: "success",
                text: "Te llegó una notificación al correo",
                showConfirmButton: false,
                timer: 1500
              });
              console.log(resp)
         })
        }
    }

    ngOnInit() {
    }

}
