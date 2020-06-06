import { Component, OnInit } from '@angular/core';
import { AdminAgronodo } from '../../Services/admin-agronodo.service';
@Component({
  selector: 'app-home-global',
  templateUrl: './home-global.component.html',
  styleUrls: ['./home-global.component.scss']
})
export class HomeGlobalComponent implements OnInit {
user:any;
  constructor( public AdminService:AdminAgronodo) { }

  ngOnInit() {
   const resp = <any>JSON.parse(localStorage.getItem("USER"));
     this.user = resp.user_type
  }

}
