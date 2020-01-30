import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
    user: any;
    public usuario:any
    constructor(public userblockService: UserblockService) {
       
        this.user = {
            picture: 'assets/img/user/01.jpg'
        };
    }

    ngOnInit() {
        this.usuario = (<any>JSON.parse(localStorage.getItem('USER')))
        console.log(this.usuario.user_type_name)
    }

    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }

}
