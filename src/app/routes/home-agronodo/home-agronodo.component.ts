import { Component, OnInit } from '@angular/core';
import { AdminAgronodo } from '../../Services/admin-agronodo.service';
import { AgricolaAgronodo } from '../../Services/agricola-agronodo.service';

@Component({
  selector: "app-home-agronodo",
  templateUrl: "./home-agronodo.component.html",
  styleUrls: ["./home-agronodo.component.scss"],
})
export class HomeAgronodoComponent implements OnInit {
  administradores:any = {
    admin: 0,
    agricolas: 0,
  };
  constructor(
    public adminagronodo: AdminAgronodo,
    public agricola: AgricolaAgronodo
  ) {}

  ngOnInit() {
    this.adminagronodo.listadmin().subscribe((resp) => {
      this.administradores = {
        ...this.administradores,
        admin: resp.length,
      };
    });
    this.agricola.listadmin().subscribe((resp) => {
      this.administradores = {
        ...this.administradores,
        agricolas: resp.length,
      };
    });
  }
}
