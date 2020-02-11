import { Component, OnInit, ViewChild } from "@angular/core";
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AgricolaAgronodo } from "../../Services/agricola-agronodo.service";

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

  constructor(public agricola:AgricolaAgronodo) {}
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild("table") tableExp: any;
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function(d) {
        return d.agricola.toLowerCase().indexOf(val) !== -1   || d.address.toLowerCase().indexOf(val) !== -1   || d.contactName.toLowerCase().indexOf(val) !== -1   || d.contactName.toLowerCase().indexOf(val) !== -1   ||  d.phone.toLowerCase().indexOf(val) !== -1   || !val ;
    });
    // update the rows
    this.listagricola = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
}
  

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
    }, 100);
  }


  

  ngOnInit() {

    this.agricola.listadmin().subscribe(resp => {
      this.listagricola = resp;
      this.temp = resp;
      console.log(resp)
    })
  }


  onSelect({ selected }) {

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
  }


}
