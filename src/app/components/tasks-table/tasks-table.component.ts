import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.css']
})
export class TasksTableComponent implements OnInit {
  tasks:any=[];
  user:any={};
  task:any={};
  constructor(private taskService:TaskService,
    private router:Router) { }

  ngOnInit(): void {

    let token = sessionStorage.getItem("token");
    if(token){
      let user: any = this.decodeToken(token);
      if (user.role =='admin') {
    this.taskService.getAllTasks().subscribe(
      (response)=>{
        console.log("here get all", response);
        this.tasks=response.tasks;
     })
    }else if(user.role == 'employee') {
       
      this.taskService.getTaskForEmployee(user.id).subscribe((response)=>{
       console.log("here response from BE",response.tasks);
       this.tasks= response.tasks;
     
      })
      }
    }
  }
  goToDisplay(id:number){
    this.router.navigate([`taskInfo/${id}`]);
  }
  goToEdit(id:number){
    this.router.navigate([`editTask/${id}`]);
  }
  
  delete(id:number){
    this.taskService.deleteTask(id).subscribe((response)=>{
      console.log("here response from BE",response.msg);
      this.taskService.getAllTasks().subscribe((data)=>{
        console.log("here data from BE",data.tasks);
       this.tasks = data.tasks; 
  })
     })
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  } 

  accept(id:any){
    this.taskService.acceptTask(id).subscribe(
      (data)=>{
        console.log("here data after delete",data.isUpdated);
      }
  )};

  refuse(id:any){
    this.taskService.refuseTask(id).subscribe(
      (data)=>{
        console.log("here data after delete",data.isUpdated);
      }
  )};
  

  isLoggedIn(){
    const jwt = sessionStorage.getItem('token');
    if (jwt) {
      this.user= this.decodeToken(jwt);
    }
    return !!jwt;
    }

}
