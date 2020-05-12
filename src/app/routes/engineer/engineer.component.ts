import { Engineer } from './../../Services/engineer.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import Swal from "sweetalert2";

@Component({
  selector: 'app-engineer',
  templateUrl: './engineer.component.html',
  styleUrls: ['./engineer.component.scss']
})
export class EngineerComponent implements OnInit {

 
  @ViewChild("table") tableExp: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  filterPost = "";
  editing = {};
  listAdmin = [];
  temp = [];
  timeout: any;
  expanded: any = {};
  selected = [];
  user = {}
  profile: any = {};
  constructor(public Engineer:Engineer) {
    
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function(d) {
        return d.names.toLowerCase().indexOf(val) !== -1  || d.user.username.toLowerCase().indexOf(val) !== -1 || d.user.email.toLowerCase().indexOf(val) !== -1 || d.phone.toLowerCase().indexOf(val) !== -1 || !val ;
    });
    // update the rows
    this.listAdmin = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem("USER"));
    this.profile = user.profile
    this.user = user; 
    console.log(user)
    this.Engineer.listadmin().subscribe(resp => {
      this.listAdmin = resp;
      this.temp = resp;
      console.log(resp)
    })
  
  }

  delete(value){
    console.log(value)
    Swal.fire({
      title: 'Seguro que quieres eliminar a',
      text: value.names,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.value) {
        console.log(result.value)
        this.Engineer.delete(value.user.username)
        .subscribe( resp => {
          
          this.Engineer.listadmin().subscribe(resp => {
            this.listAdmin = resp;
            this.temp = resp;
            console.log(resp)
          })

        })
    
      }
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

