import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Engineer } from "../../Services/engineer.service";
import Swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-task-edit",
  templateUrl: "./task-edit.component.html",
  styleUrls: ["./task-edit.component.scss"],
})
export class TaskEditComponent implements OnInit {
  @ViewChild("description") public contentModal;
  @ViewChild("selected") public selectedModal;

  id;
  lat: number = 25.8132204;
  lng: number = -108.9858821;
  zoom: number = 14;
  tareasForm: FormGroup;
  descriptionForm: FormGroup;
  selectedLots: FormGroup;
  tareasGroup: FormGroup;
  ingeniero: any = [];
  lote: any = [];
  sublote: any = [];
  field: any = [];
  nestedField: any = [];
  newTask: any = [];
  nestedSubfield: any = [];
  descriptionsObjetives: any = [];
  subloteCoordinates: any = [];
  objetives: any = [];
  id_subfield: any;
  subfield_info: any;
  typeTask = "";
  color: string;
  TaskGrouparray: any = [];
  startEnd = [];
  icon = {
    img:
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png",
  };
  recorrido = [];
  constructor(
    public ingenieroServicio: Engineer,
    public router: Router,
    private route: ActivatedRoute
  ) {
    let date: any = new Date();
    let mes = ("0" + (date.getMonth() + 1)).slice(-2);
    let dia = ("0" + (date.getDate() + 1)).slice(-2);
    let año = date.getFullYear();
    let fecha = año + "-" + mes + "-" + dia;
    console.log(fecha);

    this.tareasForm = new FormGroup({
      id: new FormControl(""),
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      engineer: new FormControl("", Validators.required),
      swDate: new FormControl("", Validators.required),
      startDate: new FormControl(fecha),
      endDate: new FormControl(""),
    });
    this.tareasGroup = new FormGroup({
      engineer: new FormControl("", Validators.required),
    });
    this.selectedLots = new FormGroup({
      lotes: new FormControl("", Validators.required),
      sublotes: new FormControl("", Validators.required),
    });
    this.descriptionForm = new FormGroup({
      description: new FormControl("", Validators.required),
    });
  }
  ngAfterViewInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) {
      this.selectedModal.show();
    }
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.id = id;
    console.log(this.id);
    if (id != null) {
      this.ingenieroServicio.getTask(id).subscribe((Resp: any) => {
        this.setDataSimple(Resp);
      });
    }
    this.getData();
  }
  getData() {
    this.ingenieroServicio.listadmin().subscribe((Resp: any) => {
      this.ingeniero = Resp;
    });
    this.ingenieroServicio.listField().subscribe((Resp: any) => {
      this.lote = Resp;
    });
    this.ingenieroServicio.listSubfield().subscribe((Resp: any) => {
      this.sublote = Resp;
    });
  }

  setDataSimple(Resp) {
    let JsonSwDate = false;
    let Initial = Resp.objectives;
    console.log(Resp);

    if (Resp.objectives[0].description === "") {
      console.log(Resp.objectives[0].description);
      this.typeTask = "Recorrido";
    } else {
      this.typeTask = "Simple";
      console.log("entro");
    }
    for (let item of Initial) {
      let obj = {
        lat: item.lat,
        lng: item.lng,
      };
      this.descriptionsObjetives.push(item.description);
      this.newTask.push(obj);
      this.objetivos();
    }
    this.startEnd.push(Initial[0]);
    this.startEnd.push(Initial[Initial.length - 1]);
    this.ingenieroServicio
      .getSubloteID(Resp.subfield)
      .subscribe((resp2: any) => {
        if (Resp.due_date != null) {
          JsonSwDate = true;
        }
        this.tareasForm.setValue({
          id: Resp.id,
          name: Resp.title,
          description: Resp.description,
          engineer: Resp.engineer,
          swDate: JsonSwDate,
          endDate: Resp.due_date,
          startDate: Resp.start_date,
        });
        this.subloteCoordinates = resp2.subfieldCoordinates;
        const array: any[] = Array.of(this.subloteCoordinates);
        this.nestedSubfield = array;
        this.centrarCamara(
          resp2.subfieldCoordinates[0].lat,
          resp2.subfieldCoordinates[0].lng
        );
        this.ingenieroServicio
          .getLoteID(resp2.father_field)
          .subscribe((loteResp: any) => {
            this.field = loteResp.coordinates;
            const array: any[] = Array.of(this.field);
            this.nestedField = array;
          });
      });
  }

  addMarker(lat: number, lng: number) {
    switch (this.typeTask) {
      case "Simple":
        this.contentModal.show();
        let obj1 = {
          lat: lat,
          lng: lng,
        };
        this.newTask.push(obj1);
        break;
      case "Recorrido":
        let obj = {
          lat: lat,
          lng: lng,
        };
        this.newTask.push(obj);
        if (this.newTask.length > 0) {
          this.objetivos();
          let i = 0;
          this.submitDescription(i);
          i++;
        }
        break;
      default:
        break;
    }
  }

  registrar(value: any) {
    // Swal.fire({
    //   text: "Guardar información",
    //   allowOutsideClick: false,
    //   width: "270px",
    // });
    // Swal.showLoading();
    if (this.id == null) {
      this.guardarTarea(value);
    } else {
      this.updateTarea(value);
    }
  }

  guardarTarea(value: any) {
    this.objetivoSimple();
    let obj = {
      engineer: value.engineer,
      title: value.name,
      description: value.description,
      objectives: this.objetives,
      start_date: value.startDate,
      due_date: value.endDate,
    };
    console.log(obj);

    this.ingenieroServicio.registerTask(obj, this.id_subfield).subscribe(
      (resp) => {
        Swal.fire({
          text: "Se creó correctamente " + value.name,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          width: "250px",
        });
        this.router.navigateByUrl("/Tareas");
      },
      (err: any) => {
        console.log(err);
        Swal.fire({
          text: err._body,
          showConfirmButton: false,
          timer: 1500,
          icon: "error",
          width: "250px",
        });
      }
    );
  }

  updateTarea(value: any) {
    switch (this.typeTask) {
      case "Simple":
        this.objetivoSimple();
        break;
      case "Recorrido":
        this.objetivos();
        break;
      default:
        break;
    }
    let obj = {
      id: value.id,
      engineer: value.engineer,
      title: value.name,
      description: value.description,
      objectives: this.objetives,
      due_date: value.endDate,
    };
    console.log(obj);
    this.ingenieroServicio.editTask(obj).subscribe(
      (resp: any) => {
        Swal.fire({
          text: "Datos actualizados correctamente " + value.name,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          width: "250px",
        });
        this.router.navigateByUrl("/Tareas");
      },
      (err: any) => {
        console.log(err);
        Swal.fire({
          text: err._body,
          showConfirmButton: false,
          timer: 1500,
          icon: "error",
          width: "250px",
        });
      }
    );
  }
  changeOrderIncidence(value) {
    this.ingenieroServicio.getLoteID(value).subscribe((Resp: any) => {
      this.field = Resp.coordinates;
      this.centrarCamara(Resp.coordinates[0].lat, Resp.coordinates[0].lng);
      const array: any[] = Array.of(this.field);
      this.nestedField = array;
      this.sublote = Resp.subfield;
      this.nestedSubfield = [];
    });
  }

  changeSublotePicker(value) {
    console.log(value);
    this.id_subfield = value;
    this.ingenieroServicio.getSubloteID(value).subscribe((Resp: any) => {
      this.subloteCoordinates = Resp.subfieldCoordinates;
      this.color = Resp.color;
      const array: any[] = Array.of(this.subloteCoordinates);
      this.nestedSubfield = array;
    });
  }

  centrarCamara(lat, lng) {
    this.zoom = 10;
    this.lat = lat;
    this.lng = lng;
    this.zoom = 16;
  }

  submitDescription(value) {
    this.descriptionsObjetives.push(value.description);
    this.descriptionForm.setValue({
      description: "",
    });
  }

  back() {
    if (this.newTask.length > 0) {
      this.newTask.splice(this.newTask.length - 1);
      this.descriptionsObjetives.splice(this.descriptionsObjetives.length - 1);
    }
  }
  type(value) {
    if (value) {
      this.typeTask = value;
      this.selectedModal.hide();
    }
  }
  objetivos() {
    this.objetives = [];
    for (let i = 0; i < this.newTask.length; i++) {
      let Jsonobjetives = {
        lat: this.newTask[i].lat,
        lng: this.newTask[i].lng,
      };
      this.objetives.push(Jsonobjetives);
    }
    this.recorrido.push(this.objetives);
  }
  objetivoSimple() {
    this.objetives = [];
    for (let i = 0; i < this.newTask.length; i++) {
      let Jsonobjetives = {
        lat: this.newTask[i].lat,
        lng: this.newTask[i].lng,
        description: this.descriptionsObjetives[i],
      };
      this.objetives.push(Jsonobjetives);
    }
  }
}
