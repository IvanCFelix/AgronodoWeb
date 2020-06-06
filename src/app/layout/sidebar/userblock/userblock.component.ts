import { Component, OnInit } from "@angular/core";

import { UserblockService } from "./userblock.service";
import { Uris } from "../../../Services/Uris";
import { AdminAgronodo } from "../../../Services/admin-agronodo.service";
@Component({
  selector: "app-userblock",
  templateUrl: "./userblock.component.html",
  styleUrls: ["./userblock.component.scss"],
})
export class UserblockComponent implements OnInit {
  public link = Uris.API_ENDPOINT;
  public usuario: any;
  public photo;
  public name;
  public type;
  public username: string = "";
  constructor(
    public userblockService: UserblockService,
    public adminService: AdminAgronodo
  ) {}
  ngDoCheck() {
    this.getusers();
  
  }
  ngOnInit() {
    const token = localStorage.getItem("token");
    this.getusers()
   
  }
  getprofile() {
    this.adminService.getRefresh().subscribe((resp) => {
      localStorage.setItem("USER", JSON.stringify(resp));
    });
  }
  getusers() {

       const data = <any>JSON.parse(localStorage.getItem("USER"));
       const user = data;
       this.username = user.username;
       if (user) {
         // localStorage.setItem("profile", JSON.stringify(resp));
         this.usuario = user;
         this.type = user.user_type_name;
         // this.username = resp.username
         switch (user.user_type) {
           // Agronodo
           case 2: {
             this.photo = user.profile.photo;
             this.name = user.profile.names;
             break;
           }
           //Admin agronodo
           case 3: {
             break;
           }
           //Agricola
           case 4: {
             this.photo = user.profile.photo;
             this.name = user.profile.agricola;
             break;
           }
           // Admin Agricola
           case 5: {
             this.photo = user.profile.photo;
             this.name = user.profile.names;

             break;
           }
           //Admin Ingeniero
           case 6: {
             this.photo = user.profile.photo;
             this.name = user.profile.names;
             break;
           }
           default: {
             break;
           }
         }
       }
     
  }
  userBlockIsVisible() {
    return this.userblockService.getVisibility();
  }
}
