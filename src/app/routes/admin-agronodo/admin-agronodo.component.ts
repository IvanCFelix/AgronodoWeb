import { Component, OnInit,ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-agronodo',
  templateUrl: './admin-agronodo.component.html',
  styleUrls: ['./admin-agronodo.component.scss']
})
export class AdminAgronodoComponent implements OnInit {
  rowsExp = [
    {
      id:"111111",
      name: "Ethel 111111",
      last_name: "female",
      email: "Julionpedrito@gmail.com",
      phone: 225555
    },
    
    {
      id:"222222",
      name: "Ethel 222222",
      last_name: "female",
      email: "Julionpedrito@gmail.com",
      phone: 225555
    },
    {
      id:"3333333",
      name: "Ethel 3333333",
      last_name: "female",
      email: "Julionpedrito@gmail.com",
      phone: 225555
    },
    {
      id:"4444444",
      name: "Ethel 4444444",
      last_name: "female",
      email: "Julionpedrito@gmail.com",
      phone: 225555
    },
    {
      id:"555555",
      name: "Ethel 555555",
      last_name: "female",
      email: "Julionpedrito@gmail.com",
      phone: 225555
    },
    {
      id:"6666666",
      name: "Ethel 6666666",
      last_name: "female",
      email: "Julionpedrito@gmail.com",
      phone: 225555
    },
    {
      id:"77777777",
      name: "Ethel 77777777",
      last_name: "female",
      email: "Julionpedrito@gmail.com",
      phone: 225555
    },
    {
      id:"88888888",
      name: "Ethel 88888888",
      last_name: "female",
      email: "Julionpedrito@gmail.com",
      phone: 225555
    },
    {
      id:"99999999",
      name: "Ethel 99999999",
      last_name: "female",
      email: "Julionpedrito@gmail.com",
      phone: 225555
    },
    {
      id:"000000000",
      name: "Ethel 000000000",
      last_name: "female",
      email: "Julionpedrito@gmail.com",
      phone: 225555
    },
    {
      id:"111111",
      name: "Ethel 111111",
      last_name: "female",
      email: "Julionpedrito@gmail.com",
      phone: 225555
    },
    
    {
      id:"222222",
      name: "Ethel 222222",
      last_name: "female",
      email: "Julionpedrito@gmail.com",
      phone: 225555
    },
    {
      id:"3333333",
      name: "Ethel 3333333",
      last_name: "female",
      email: "Julionpedrito@gmail.com",
      phone: 225555
    },
    {
      id:"111111",
      name: "Ethel 111111",
      last_name: "female",
      email: "Julionpedrito@gmail.com",
      phone: 225555
    },
    
    {
      id:"222222",
      name: "Ethel 222222",
      last_name: "female",
      email: "Julionpedrito@gmail.com",
      phone: 225555
    },
    {
      id:"3333333",
      name: "Ethel 3333333",
      last_name: "female",
      email: "Julionpedrito@gmail.com",
      phone: 225555
    },
  ];
  timeout: any;
  expanded: any = {};
  selected = [];
  constructor() {}

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
    }, 100);
  }
  onDetailToggle(event) {
    console.log('Detail Toggled', event);
}
 
  @ViewChild("myTable") tableExp: any;


  ngOnInit() {
  }
  onSelect({ selected }) {

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
  }
}
