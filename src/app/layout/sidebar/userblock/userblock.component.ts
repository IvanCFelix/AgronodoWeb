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
    public link:string;
    public usuario:any
    public photo;
    public name;
    public type;
    constructor(public userblockService: UserblockService, public adminService:AdminAgronodo) {
       
       
    }

    ngOnInit() {
        this.link = Uris.API_ENDPOINT
        // this.usuario = (<any>JSON.parse(localStorage.getItem('USER')))

        this.adminService.getRefresh().subscribe( resp => {
            this.usuario = resp
            this.photo = resp.profile.photo
            this.name =resp.profile.names
            this.type = resp.user_type_name
        })
    }

    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }

}
