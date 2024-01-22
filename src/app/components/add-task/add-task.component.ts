import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  task:any={};
  addTaskForm!:FormGroup;
  employees: any=[];
  employee:any
  employeeId:any;
  idEmployee:any;
  constructor(private router:Router,
    private taskService:TaskService,
    private userService:UserService) { }

  ngOnInit(): void {

    this.userService.getAllUsers().subscribe((data)=>{
      console.log("here response from Be", data);
    this.employees =data.users.filter((user:any) => user.role == 'employee');
      
      
    })

  }
  addTask(){

    console.log("here add task", this.task);
    this.task.idEmployee=this.employeeId;
    this.task.status ="waiting accept";
    this.taskService.addTask(this.task).subscribe((response)=>{
      console.log("here response from BE", response.msg);
    })
  }

  selectEmployee(evt:any){
    console.log("here employee", evt.target.value);
    this.employeeId=evt.target.value;
  }
  
}
