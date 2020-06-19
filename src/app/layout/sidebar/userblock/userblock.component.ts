import { Component, OnInit } from "@angular/core";

import { UserblockService } from "./userblock.service";
import { Uris } from "../../../Services/Uris";
import { AdminAgronodo } from "../../../Services/admin-agronodo.service";
import { AgricolaAgronodo } from "../../../Services/agricola-agronodo.service";
import { url } from "inspector";
@Component({
  selector: "app-userblock",
  templateUrl: "./userblock.component.html",
  styleUrls: ["./userblock.component.scss"],
})
export class UserblockComponent implements OnInit {
  public link;
  public usuario: any;
  public photo;
  public name;
  public type;
  imagenLocal:any = {};
  public username: string = "";
  constructor(
    public userblockService: UserblockService,
    public adminService: AdminAgronodo,
    public agricolaAgronodo: AgricolaAgronodo
  ) {
   
  }
  ngDoCheck() {
    this.imagenLocal = <any>JSON.parse(localStorage.getItem("photo"));
    if (this.imagenLocal) {
      this.link = Uris.API_ENDPOINT_IMAGE;
    } else {
      this.link = Uris.API_ENDPOINT;
    }
    this.getusers();
  }
  ngOnInit() {}
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
          
          if (this.imagenLocal) {
            this.photo = this.imagenLocal.photo;
          } else{            
            this.photo = user.profile.photo;
          }
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
  getprofile() {
    this.agricolaAgronodo.getRefresh().subscribe((resp) => {
      localStorage.setItem("USER", JSON.stringify(resp));
    });
  }
  userBlockIsVisible() {
    return this.userblockService.getVisibility();
  }
}
