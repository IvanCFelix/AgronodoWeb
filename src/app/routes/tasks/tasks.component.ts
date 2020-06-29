import { Component, OnInit, ViewChild } from "@angular/core";
import { TaskService } from "../../Services/task.service";
import Swal from "sweetalert2";
import { FormGroup, FormControl } from "@angular/forms";
import { Engineer } from "../../Services/engineer.service";
import { DatatableComponent } from "@swimlane/ngx-datatable";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"],
})
export class TasksComponent implements OnInit {
  listTareas = [];
  listTareasResolved = [];

  @ViewChild("table") tableExp: any;
  @ViewChild("infoTask") public contentModal;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  infoTaskForm: FormGroup;
  timeout: any;
  temp = [];
  lat: number = 25.8132204;
  lng: number = -108.9858821;
  zoom: number = 14;
  nestedField = [];
  taskMarkers = [];
  nestedSubfield = [];
  constructor(
    public taskService: TaskService,
    public ingenieroServicio: Engineer
  ) {
    this.infoTaskForm = new FormGroup({
      id: new FormControl(-1),
      title: new FormControl(""),
      description: new FormControl(""),
      engineer: new FormControl(""),
      end_date: new FormControl(""),
    });
  }
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
    this.listTareas = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  ngOnInit() {
    this.getTareas();
  }
  getTareas() {
    this.taskService.listTask().subscribe((resp) => {
      // this.listTareas = resp;
      console.log(resp)
      let arr = [];
      let arr2 = [];
      for (let item of resp) {
        if (!item.done_datetime) {
          arr.push(item);
          this.listTareas = arr;
        }
        if (item.done_datetime !== null) {
          arr2.push(item);
          this.listTareasResolved = arr2;
        }
      }
    });
  }
  modalshow(value: string) {
    this.contentModal.show("@getbootstrap");
  }

  limpiarListas() {
    this.taskMarkers = [];
  }

  centrarCamara(lat, lng) {
    this.zoom = 10;
    this.lat = lat;
    this.lng = lng;
    this.zoom = 16;
  }

  contentId(row) {
    console.log(row);
    this.infoTaskForm.setValue({
      id: row.id,
      title: row.title,
      description: row.description,
      engineer: row.engineer,
      end_date: row.due_date,
    });
    for (let item of row.objectives) {
      let obj = {
        lat: item.lat,
        lng: item.lng,
      };
      this.taskMarkers.push(obj);
    }
    this.ingenieroServicio
      .getSubloteID(row.subfield)
      .subscribe((subFieldResp: any) => {
        const array: any[] = Array.of(subFieldResp.subfieldCoordinates);
        this.nestedSubfield = array;
        this.centrarCamara(
          subFieldResp.subfieldCoordinates[0].lat,
          subFieldResp.subfieldCoordinates[0].lng
        );
        this.ingenieroServicio
          .getLoteID(subFieldResp.father_field)
          .subscribe((fieldResp: any) => {
            const array: any[] = Array.of(fieldResp.coordinates);
            this.nestedField = array;
          });
      });
  }

  delete(value) {
    Swal.fire({
      title: "Seguro que quieres eliminar esta tarea",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, cancelar!",
    }).then((result) => {
      if (result.value) {
        this.taskService.delete(value.id).subscribe((resp) => {
          this.taskService.listTask().subscribe((resp) => {
            this.listTareas = resp;
          });
        });
      }
    });
  }
  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {}, 100);
  }
}
