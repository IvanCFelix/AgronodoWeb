import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-agricola-agronodo",
  templateUrl: "./agricola-agronodo.component.html",
  styleUrls: ["./agricola-agronodo.component.scss"]
})
export class AgricolaAgronodoComponent implements OnInit {
  rowsExp = [];
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
