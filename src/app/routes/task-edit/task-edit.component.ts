import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Engineer } from '../../Services/engineer.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})

export class TaskEditComponent implements OnInit {
  @ViewChild('ModalIngeniero') public contentModal;
  lat: number = 25.8132204;
  lng: number = -108.9858821;
  zoom: number = 12;
  tareasForm : FormGroup;
  ingeniero:any=[];

  constructor(public ingenieroServicio:Engineer) {
    this.tareasForm = new FormGroup({
      id: new FormControl(""),
      name: new FormControl("",Validators.required),
      description:new FormControl("",Validators.required),
      engineer:new FormControl("",Validators.required),
      swDate: new FormControl("",Validators.required),
      startDate: new FormControl(""),
      endDate: new FormControl("")
    

    })
   }

  ngOnInit() {
    this.modalshow('@getbootstrap');
  this.ingenieroServicio.listadmin().subscribe((Resp:any )=> {
    console.log(Resp);
    this.ingeniero = Resp;
  })
  }

  addMarkerTarea(Lat,Lng){
    console.log(Lat+"- "+ Lng)
  }
 
  guardarTarea(value){
    console.log(value);
  }

  modalshow(value:string){
  this.contentModal.show(value);
  }
}
