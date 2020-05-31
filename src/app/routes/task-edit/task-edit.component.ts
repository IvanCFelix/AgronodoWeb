import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Engineer } from '../../Services/engineer.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})

export class TaskEditComponent implements OnInit {
  lat: number = 25.8132204;
  lng: number = -108.9858821;
  zoom: number = 14;
  tareasForm : FormGroup;
  ingeniero:any=[];
  lote:any=[];
  sublote:any=[];
  field:any=[];
  nestedField:any=[];
  newTask:any=[];
  nestedSubfield:any=[];
  descriptionsObjetives:any=[];
  subloteCoordinates:any=[];
  objetives:any=[];
  constructor(public ingenieroServicio:Engineer) {
    this.tareasForm = new FormGroup({
      id: new FormControl(""),
      name: new FormControl("",Validators.required),
      description:new FormControl("",Validators.required),
      engineer:new FormControl("",Validators.required),
      swDate: new FormControl("",Validators.required),
      startDate: new FormControl(""),
      endDate: new FormControl(""),
      lotes: new FormControl("",Validators.required),
      sublotes: new FormControl("",Validators.required)
    })
   }

  ngOnInit() {
  this.ingenieroServicio.listadmin().subscribe((Resp:any )=> {
    //console.log(Resp);
    this.ingeniero = Resp;
  })
  this.ingenieroServicio.listField().subscribe((Resp:any )=> {
   // console.log(Resp);
    this.lote= Resp;
  })
  this.ingenieroServicio.listSubfield().subscribe((Resp:any )=> {
    //console.log(Resp);
  })
  }

  addMarker(lat: number, lng: number){
    let obj = {
      lat: lat,
      lng: lng
    };
     
  }
 
  guardarTarea(value: any){
  for(var i =0; i<=this.newTask.length;i++){
   let Jsonobjetives ={
     "lat": this.newTask[i].lat,
     "lng": this.newTask[i].lng,
     "description": this.descriptionsObjetives[i]
   }
   this.objetives.push(Jsonobjetives);
         }
      
    let obj ={
    engineer: value.engineer.id,
    "title": value.name,
    "description": value.description,
    "objetives": this.objetives,
     "due_date": value.endDate,
     "subfield": value.sublotes
    }
  }

  changeOrderIncidence(value){
    this.ingenieroServicio.getLoteID(value).subscribe((Resp:any)=>{
        this.field = Resp.coordinates;
        this.zoom =  10;
        this.lat = Resp.coordinates[0].lat;
        this.lng =Resp.coordinates[0].lng;
        this.zoom = 16;
        const array: any[] = Array.of(this.field);
        this.nestedField = array;
        this.sublote = Resp.subfield;
        this.nestedSubfield = [];
    })
  }

  changeSublotePicker(value){
  this.ingenieroServicio.getSubloteID(value).subscribe((Resp:any)=>{
      this.subloteCoordinates = Resp.subfieldCoordinates;
      const array: any[] = Array.of(this.subloteCoordinates);
      this.nestedSubfield = array;

  })

  }

  back(){
    if(this.newTask.length > 0){
      this.newTask.splice(this.newTask.length-1);
    }
  }
}
