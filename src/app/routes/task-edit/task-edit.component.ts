import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Engineer } from '../../Services/engineer.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})

export class TaskEditComponent implements OnInit {
  @ViewChild('description') public contentModal;
  id;
  lat: number = 25.8132204;
  lng: number = -108.9858821;
  zoom: number = 14;
  tareasForm: FormGroup;
  descriptionForm: FormGroup;
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
  subfield_info:any;
  constructor(
    public ingenieroServicio: Engineer,
    public router: Router,
    private route: ActivatedRoute,
  ) {
    this.tareasForm = new FormGroup({
      id: new FormControl(""),
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      engineer: new FormControl("", Validators.required),
      swDate: new FormControl("", Validators.required),
      startDate: new FormControl(""),
      endDate: new FormControl(""),
      lotes: new FormControl("", Validators.required),
      sublotes: new FormControl("", Validators.required)
    })
    this.descriptionForm = new FormGroup({
      description: new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    let JsonSwDate = false;
    let arrayTask:any[];
    this.id = id;
    console.log(this.id);
    if (id!=null) {
      this.ingenieroServicio.getTask(id).subscribe((Resp: any) => {
        for(let item of Resp.objectives){
          let obj = {
            lat: item.lat,
            lng: item.lng
          };
          this.descriptionsObjetives.push(item.description);
          this.newTask.push(obj);
        }
        this.ingenieroServicio.getSubloteID(Resp.subfield).subscribe((resp2: any) => {
          if(Resp.due_date !=null){
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
          lotes: "",
          sublotes: resp2.nickname,
        })
        this.subloteCoordinates = resp2.subfieldCoordinates;
        const array: any[] = Array.of(this.subloteCoordinates);
        this.nestedSubfield = array;
        this.centrarCamara(resp2.subfieldCoordinates[0].lat,resp2.subfieldCoordinates[0].lng)
        this.ingenieroServicio.getLoteID(resp2.father_field).subscribe((loteResp: any)=>{
          this.field = loteResp.coordinates;
          const array: any[] = Array.of(this.field);
          this.nestedField = array;
        })
      })
    })
    }


    this.ingenieroServicio.listadmin().subscribe((Resp: any) => {
      this.ingeniero = Resp;
    })
    this.ingenieroServicio.listField().subscribe((Resp: any) => {
      this.lote = Resp;
    })
    this.ingenieroServicio.listSubfield().subscribe((Resp: any) => {
        this.sublote = Resp;
    })
  }

  modalshow(value: string) {
    this.contentModal.show();
  }

  addMarker(lat: number, lng: number) {
    if(this.subloteCoordinates.length==0){
    }else{
      this.modalshow('@getbootstrap');
      let obj = {
        lat: lat,
        lng: lng,
  
      };
      this.newTask.push(obj);
    }
  }

  registrar(value: any) {
    Swal.fire({
      text: "Guardar información",
      allowOutsideClick: false,
      width: "270px",
    });
    Swal.showLoading();
    if (this.id == null) {
      this.guardarTarea(value);
    }else{
      console.log(value);
      this.updateTarea(value);
    }
  }

  guardarTarea(value: any) {
    let i = 0;
    for (let item of this.newTask) {
      let Jsonobjetives = {
        lat: item.lat,
        lng: item.lng,
        description: this.descriptionsObjetives[i]
      }
      this.objetives.push(Jsonobjetives);
      i++;
    }
    let obj = {
      engineer: value.engineer,
      title: value.name,
      description: value.description,
      objectives: this.objetives,
      start_date: value.startDate,
      due_date: value.endDate,
    }
    this.id_subfield = value.sublotes;
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
          text: "Error en el sevidor",
          showConfirmButton: false,
          timer: 1500,
          icon: "error",
          width: "250px",
        });
      }
    );
  }

  updateTarea(value: any) {
    let i = 0;
    for (let item of this.newTask) {
      let Jsonobjetives = {
        lat: item.lat,
        lng: item.lng,
        description: this.descriptionsObjetives[i]
      }
      this.objetives.push(Jsonobjetives);
      i++;
    }
    let obj = {
      id:value.id,
      engineer: value.engineer,
      title: value.name,
      description: value.description,
      objectives: this.objetives,
      due_date: value.endDate,
    }
    console.log(obj);
    this.ingenieroServicio.editTask(obj).subscribe((resp:any)=>{
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
        text: "Error en el sevidor",
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
      this.centrarCamara(Resp.coordinates[0].lat,Resp.coordinates[0].lng);
      const array: any[] = Array.of(this.field);
      this.nestedField = array;
      this.sublote = Resp.subfield;
      this.nestedSubfield = [];

    })
  }

  changeSublotePicker(value) {
    this.ingenieroServicio.getSubloteID(value).subscribe((Resp: any) => {
      this.subloteCoordinates = Resp.subfieldCoordinates;
      const array: any[] = Array.of(this.subloteCoordinates);
      this.nestedSubfield = array;

    })

  }

  centrarCamara(lat,lng){
    this.zoom = 10;
    this.lat = lat;
    this.lng = lng;
    this.zoom = 16;
  }

  submitDescription(value) {
    this.descriptionsObjetives.push(value.description);
    this.descriptionForm.setValue({
      description: ""
    })
    console.log(this.descriptionsObjetives);
  }

  back() {
    if (this.newTask.length > 0) {
      this.newTask.splice(this.newTask.length - 1);
      this.descriptionsObjetives.splice(this.descriptionsObjetives.length - 1);
    }
  }
}
