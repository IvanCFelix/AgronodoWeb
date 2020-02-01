import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';
import {  Uris } from '../../../Services/Uris'
@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
    public link:string;
    public usuario:any
    constructor(public userblockService: UserblockService) {
       
       
    }

    ngOnInit() {
        this.link = Uris.API_ENDPOINT
        this.usuario = (<any>JSON.parse(localStorage.getItem('USER')))
        
        console.log()
    }

    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }

}
