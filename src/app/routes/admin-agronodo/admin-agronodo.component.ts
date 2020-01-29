import { AdminAgronodo } from './../../Services/admin-agronodo.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-admin-agronodo',
  templateUrl: './admin-agronodo.component.html',
  styleUrls: ['./admin-agronodo.component.scss']
})
export class AdminAgronodoComponent implements OnInit {
  
  @ViewChild("table") tableExp: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  filterPost = "";
  editing = {};
  listAdmin = [];
  temp = [];
  timeout: any;
  expanded: any = {};
  selected = [];
  constructor(public AdminagronodoService:AdminAgronodo) {
    
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function(d) {
        return d.names.toLowerCase().indexOf(val) !== -1  || d.lastnames.toLowerCase().indexOf(val) !== -1  || d.user.username.toLowerCase().indexOf(val) !== -1 || d.user.email.toLowerCase().indexOf(val) !== -1 || d.phone.toLowerCase().indexOf(val) !== -1 || !val ;
    });
    // update the rows
    this.listAdmin = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
}

  ngOnInit() {
    this.AdminagronodoService.listadmin().subscribe(resp => {
      this.listAdmin = resp;
      this.temp = resp;
      console.log(resp)
    })
  }

  
  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
    }, 100);
  }
  onDetailToggle(event) {
    console.log('Detail Toggled', event);
}
 
  onSelect({ selected }) {

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
  }
}
