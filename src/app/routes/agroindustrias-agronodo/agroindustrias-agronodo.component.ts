import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-agroindustrias-agronodo",
  templateUrl: "./agroindustrias-agronodo.component.html",
  styleUrls: ["./agroindustrias-agronodo.component.scss"]
})
export class AgroindustriasAgronodoComponent implements OnInit {
  rowsExp = [
    {
      name: "Ethel Price",
      gender: "female",
      company: "Johnson, Johnson and Partners, LLC CMP DDC",
      age: 22
    },
    {
      name: "Claudine Neal",
      gender: "female",
      company: "Sealoud",
      age: 55
    },
    {
      name: "Beryl Rice",
      gender: "female",
      company: "Velity",
      age: 67
    },
    {
      name: "Wilder Gonzales",
      gender: "male",
      company: "Geekko"
    },
    {
      name: "Claudine Neal",
      gender: "female",
      company: "Sealoud",
      age: 55
    },
    {
      name: "Beryl Rice",
      gender: "female",
      company: "Velity",
      age: 67
    },
    {
      name: "Wilder Gonzales",
      gender: "male",
      company: "Geekko"
    },
    {
      name: "Claudine Neal",
      gender: "female",
      company: "Sealoud",
      age: 55
    },
    {
      name: "Beryl Rice",
      gender: "female",
      company: "Velity",
      age: 67
    },
    {
      name: "Wilder Gonzales",
      gender: "male",
      company: "Geekko"
    }
  ];
  timeout: any;

  editing = {};
  rows = [];
  rowsFilter = [];

  rowsSort = [];
  temp = [];
  expanded: any = {};

  rowsSel = [];
  selected = [];
  constructor() {}
  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log("paged!", event);
    }, 100);
  }
  toggleExpandRow(row) {
    console.log("Toggled Expand Row!", row);
    this.tableExp.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log("Detail Toggled", event);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open("GET", `assets/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  @ViewChild("myTable") tableExp: any;

  ngOnInit() {}

  // Selection

  onSelect({ selected }) {
    console.log("Select Event", selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    console.log("Activate Event", event);
  }
}
