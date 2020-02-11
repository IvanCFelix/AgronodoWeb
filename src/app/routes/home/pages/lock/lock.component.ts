import { AdminAgronodo } from './../../../../Services/admin-agronodo.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../../../Services/login.service';
import { CustomValidators } from 'ng2-validation';
import { SettingsService } from './../../../../core/settings/settings.service';
import { Component, OnInit, Injector } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from "sweetalert2";

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
    password;

    constructor(public settings: SettingsService, fb: FormBuilder, public injector: Injector,public resetService:AuthService,private route: ActivatedRoute,
        public userReser:AdminAgronodo) {

        let password = new FormControl('', Validators.required);
        let certainPassword = new FormControl('', CustomValidators.equalTo(password));
        if(this.route.snapshot.paramMap.get("token")){
            console.log("entro")
            this.valForm = fb.group({
                'passwordGroup': fb.group({
                    new_password1: password,
                    new_password2: certainPassword
                })
            });

        }else{
            this.valForm = fb.group({   
                'password': [null, Validators.required],

               'passwordGroup': fb.group({
                   new_password1: password,
                   new_password2: certainPassword
               })
           });
        }
        
    }

   

    ngOnInit() {
        this.router = this.injector.get(Router);
        const user = this.route.snapshot.paramMap.get("user");
        this.user = user;
        const token = this.route.snapshot.paramMap.get("token");
        this.token = token;
        const password = this.route.snapshot.paramMap.get("password");
        this.password = password;
    }


    submitForm(value: any) {
        if (this.valForm.valid) {
            Swal.fire({
                text: "Guardar información",
                allowOutsideClick: false,
                width: '270px'
              });
              Swal.showLoading();
            if(this.password){
                let obj = {
                    old_password: value.password,
                    new_password1: value.passwordGroup.new_password1,
                    new_password2: value.passwordGroup.new_password2,
                }
               this.userReser.reset(obj).subscribe(resp => {
                Swal.fire({
                    text: "Se Guardó correctamente",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    width: '300px'
                  });
                this.router.navigate(['/home']);
               }, err => {
                Swal.fire({
                    text: "Error en el sevidor",
                    showConfirmButton: false,
                    timer: 1500,
                    icon:'error',
                    width: '250px'
                  });
               })
            }else{
                let obj = {
                    new_password1: value.passwordGroup.new_password1,
                    new_password2: value.passwordGroup.new_password2,
                    uid: this.user,
                    token: this.token
                }
            try {
                this.resetService.setConfirm(obj).subscribe(resp =>{
                    Swal.fire({
                        text: "Se Guardó correctamente",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                        width: '250px'
                      });
                    this.router.navigate(['/login']);
               }, err =>{
                Swal.fire({
                    text: "Error en el sevidor",
                    showConfirmButton: false,
                    timer: 1500,
                    icon:'error',
                    width: '250px'
                  });
               })
              }
              catch(error) {
                console.log(obj);
                this.resetService.reset(obj).subscribe(resp =>{
                    Swal.fire({
                        text: "Se Guardó correctamente",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                        width: '250px'
                      });
                     this.router.navigate(['/login']);
                }, err => {
                    Swal.fire({
                        text: "Error en el sevidor",
                        showConfirmButton: false,
                        timer: 1500,
                        icon:'error',
                        width: '250px'
                      });
                })
              }
            }


        }
    }

}
