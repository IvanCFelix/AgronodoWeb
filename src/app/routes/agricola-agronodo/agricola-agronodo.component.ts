import { Uris } from './../../Services/Uris';
import { Component, OnInit, ViewChild } from "@angular/core";
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AgricolaAgronodo } from "../../Services/agricola-agronodo.service";
import Swal from "sweetalert2";


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
  url =  Uris.API_ENDPOINT

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

   delete(value){
    console.log(value)
    Swal.fire({
      title: 'Seguro que quieres eliminar esta agricola?',
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
        this.agricola.delete(value.user.username)
        .subscribe( resp => {
          
          this.agricola.listadmin().subscribe(resp => {
            this.listagricola = resp;
            this.temp = resp;
            console.log(resp)
          })

        })
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success',
        // )
      }
    })
  }

}
