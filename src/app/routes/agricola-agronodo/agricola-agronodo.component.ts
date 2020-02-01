import { Component, OnInit, ViewChild } from "@angular/core";
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: "app-agricola-agronodo",
  templateUrl: "./agricola-agronodo.component.html",
  styleUrls: ["./agricola-agronodo.component.scss"]
})
export class AgricolaAgronodoComponent implements OnInit {
  listagricola = [];
  timeout: any;
  expanded: any = {};
  selected = [];
  temp = [];

  constructor() {}

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
    }, 100);
  }
  @ViewChild(DatatableComponent) table: DatatableComponent;

  @ViewChild("myTable") tableExp: any;


  ngOnInit() {}


  onSelect({ selected }) {

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function(d) {
        return d.names.toLowerCase().indexOf(val) !== -1  || d.lastnames.toLowerCase().indexOf(val) !== -1  || d.user.username.toLowerCase().indexOf(val) !== -1 || d.user.email.toLowerCase().indexOf(val) !== -1 || d.phone.toLowerCase().indexOf(val) !== -1 || !val ;
    });
    // update the rows
    this.listagricola = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
}
}
