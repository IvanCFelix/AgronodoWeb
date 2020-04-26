import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../Services/task.service';

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
}
