import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../Services/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  listTareas = []
  constructor(public taskService:TaskService) { }

  ngOnInit() {
    this.taskService.listTask().subscribe(resp => {
      console.log(resp)
      this.listTareas = resp
})

  }
  
  delete(value){
    console.log(value)
    Swal.fire({
      title: 'Seguro que quieres eliminar esta tarea',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.value) {
        console.log(result.value)
    
      }
    })
  }
}
