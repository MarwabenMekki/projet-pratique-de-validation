import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.css']
})
export class TaskInfoComponent implements OnInit {
  task:any={}
  id:any
  constructor(private activateRoute:ActivatedRoute,
    private taskService:TaskService) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.paramMap.get("id")
    this.taskService.getTaskById(this.id).subscribe((response)=>{
      console.log("here response from BE",response.task);
      this.task = response.task;
    })
  }

}
