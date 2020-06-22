import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  navbarOpen = false; 
  constructor() { }

  ngOnInit() {
    localStorage.clear();
  }

  

  toggleNavbar () { 
    this.navbarOpen =! this.navbarOpen; 
  } 
}
