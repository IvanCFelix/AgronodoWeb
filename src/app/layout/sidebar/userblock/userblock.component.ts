import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';
import {  Uris } from '../../../Services/Uris'
import {  AdminAgronodo  }  from '../../../Services/admin-agronodo.service'
@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
    public link =Uris.API_ENDPOINT;
    public usuario:any
    public photo;
    public name;
    public type;
    constructor(public userblockService: UserblockService, public adminService:AdminAgronodo) {
       
       
    }

    ngOnInit() {

        // this.usuario = (<any>JSON.parse(localStorage.getItem('USER')))

        this.adminService.getRefresh().subscribe( resp => {
            this.usuario = resp
            this.type = resp.user_type_name
            console.log(resp)
            switch (resp.user_type) {
                // Agronodo
                case 2: {
                    this.photo = resp.profile.photo
                    this.name = resp.profile.names
                  break;
                }
                //Admin agronodo
                case 3: {
                  break;
                }
                //Agricola
                case 4: {
                    this.photo = resp.profile.photo
                    this.name = resp.profile.agricola
                  break;
                }
                // Admin Agricola
                case 5: {
                  this.photo = resp.profile.photo
                  this.name = resp.profile.names

                  break;
                }
                //Admin Ingeniero
                case 6: {
                  this.photo = resp.profile.photo
                  this.name = resp.profile.names
                  break;
                }
                default: {
                  break;
                }
              }
            
        })
    }

    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }

}
