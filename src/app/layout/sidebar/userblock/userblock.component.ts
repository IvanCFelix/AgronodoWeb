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
    public username;
    constructor(public userblockService: UserblockService, public adminService:AdminAgronodo) {
       
       
    }

    ngOnInit() {
      const user = <any>JSON.parse(localStorage.getItem("profile"));
      this.username = user.username
      
      
        // this.usuario = (<any>JSON.parse(localStorage.getItem('USER')))

      this.adminService.getRefresh().subscribe(resp => {
        localStorage.setItem("profile", JSON.stringify(resp));
       console.log(resp)
            this.usuario = resp
            this.type = resp.user_type_name
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
