import { AdminAgronodo } from "./../../Services/admin-agronodo.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import Swal from "sweetalert2";
import { upperFirst } from "lodash";

@Component({
  selector: "app-admin-agronodo",
  templateUrl: "./admin-agronodo.component.html",
  styleUrls: ["./admin-agronodo.component.scss"],
})
export class AdminAgronodoComponent implements OnInit {
  @ViewChild("table") tableExp: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  filterPost = "";
  editing = {};
  listAdmin: any = [];
  temp: any = [];
  timeout: any;
  expanded: any = {};
  selected = [];
  item = []
  constructor(public AdminagronodoService: AdminAgronodo) {}
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d) {
      return (
        d.names.toLowerCase().indexOf(val) !== -1 ||
        d.user.username.toLowerCase().indexOf(val) !== -1 ||
        d.user.email.toLowerCase().indexOf(val) !== -1 ||
        d.phone.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    // update the rows
    this.listAdmin = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  ngOnInit() {
    const user = <any>JSON.parse(localStorage.getItem("USER"));
    this.AdminagronodoService.listadmin().subscribe((resp) => {    
      this.item = []
      console.log(resp);
      
      for (let i = 0; i < resp.length; i++) {
        if (resp[i].user.username === user.username) {         
        } else {   
          this.item.push(resp[i])
          this.listAdmin = this.item
          this.temp = this.item;
        }
      }
    });
  }

  delete(value) {
    console.log(value);
    Swal.fire({
      title: "Seguro que quieres eliminar a",
      text: value.names,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, cancelar!",
    }).then((result) => {
      if (result.value) {
        console.log(result.value);
        this.AdminagronodoService.delete(value.user.username).subscribe(
          (resp) => {
            const user = <any>JSON.parse(localStorage.getItem("USER"));
            this.AdminagronodoService.listadmin().subscribe((resp) => {
              this.item = []
           for (let i = 0; i < resp.length; i++) {
             if (resp[i].user.username === user.username) {
             } else {
               this.item.push(resp[i]);
               this.listAdmin = this.item;
               this.temp = this.item;
             }
           }
            });
          }
        );
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success',
        // )
      }
    });
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {}, 100);
  }
  onDetailToggle(event) {
    console.log("Detail Toggled", event);
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {}
}
