import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  editTaskForm!: FormGroup;
  task: any={};
  tasks: any=[];
  id: any;
  errorMsg:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService:TaskService,
    private router:Router ) { }

  ngOnInit(): void {

    this.id= this.activatedRoute.snapshot.paramMap.get("id");
  
  this.taskService.getTaskById(this.id).subscribe(
    (data)=>{
      console.log("here data from BE",data);
      this.task=data.task;
    });
  }

  editTask(){
    console.log("here new task", this.task);
    this.taskService.editTask(this.task).subscribe(
      (response)=>{
        console.log(response.isUpdated);
        if (response.isUpdated) {
          this.router.navigate(['dashboardAdmin']);
        }else{
          this.errorMsg = "Error in editing";
        }
  
      }
    );
  }
}
