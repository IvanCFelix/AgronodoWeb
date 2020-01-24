import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-agroindustrias-agronodo",
  templateUrl: "./agroindustrias-agronodo.component.html",
  styleUrls: ["./agroindustrias-agronodo.component.scss"]
})
export class AgroindustriasAgronodoComponent implements OnInit {
  rowsExp = [
    {
      id:"111111",
      agroindustry: "Ethel Price",
      address: "female",
      name: "Julion pedrito",
      number_contact: 225555
    },
    {
      id:"222222",
      agroindustry: "Ethel Price",
      address: "female",
      name: "Julion pedrito",
      number_contact: 225555
    },
    {
      id:"3333333",
      agroindustry: "Ethel Price",
      address: "female",
      name: "Julion pedrito",
      number_contact: 225555
    },
    {
      id:"4444444",
      agroindustry: "Ethel Price",
      address: "female",
      name: "Julion pedrito",
      number_contact: 225555
    },
    {
      id:"555555",
      agroindustry: "Ethel Price",
      address: "female",
      name: "Julion pedrito",
      number_contact: 225555
    },
    {
      id:"6666666",
      agroindustry: "Ethel Price",
      address: "female",
      name: "Julion pedrito",
      number_contact: 225555
    },
    {
      id:"77777777",
      agroindustry: "Ethel Price",
      address: "female",
      name: "Julion pedrito",
      number_contact: 225555
    },
    {
      id:"88888888",
      agroindustry: "Ethel Price",
      address: "female",
      name: "Julion pedrito",
      number_contact: 225555
    },
    {
      id:"99999999",
      agroindustry: "Ethel Price",
      address: "female",
      name: "Julion pedrito",
      number_contact: 225555
    },
    {
      id:"000000000",
      agroindustry: "Ethel Price",
      address: "female",
      name: "Julion pedrito",
      number_contact: 225555
    }
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
 
  @ViewChild("myTable") tableExp: any;


  ngOnInit() {}


  onSelect({ selected }) {

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
  }
}
