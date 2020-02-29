import { Component, OnInit,ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import Swal from "sweetalert2";
import { LotsAgricolaService } from '../../Services/lots-agricola.service';
@Component({
  selector: 'app-lots',
  templateUrl: './lots.component.html',
  styleUrls: ['./lots.component.scss']
})
export class LotsComponent implements OnInit {
  @ViewChild("table") tableExp: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  filterPost = "";
  editing = {};
  listlots = [];
  temp = [];
  timeout: any;
  expanded: any = {};
  selected = [];


  constructor(public LotsService:LotsAgricolaService) { }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function(d) {
        return d.names.toLowerCase().indexOf(val) !== -1   || !val ;
    });
    // update the rows
    this.listlots = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
}

  ngOnInit() {
    this.LotsService.listLots().subscribe(resp => {
    console.log(resp)
      this.listlots = resp;
      this.temp = resp;
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
        this.LotsService.delete(value.id)
        .subscribe( resp => {
          
          this.LotsService.listLots().subscribe(resp => {
            this.listlots = resp;
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




