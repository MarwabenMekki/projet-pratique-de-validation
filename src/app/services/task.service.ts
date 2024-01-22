import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskUrl: string ="http://localhost:3003/tasks";

  constructor(private httpClient:HttpClient) { }

  getAllTasks(){  
    return this.httpClient.get<{tasks:any}>(this.taskUrl);
      }
    
  getTaskById(id:any){
    return this.httpClient.get<{task:any}>(`${this.taskUrl}/${id}`);
      }
    
  addTask(obj:any){

        return this.httpClient.post<{msg:string}>(this.taskUrl,obj);
      }
    
  editTask(obj:any){
    return this.httpClient.put<{isUpdated:boolean}>(this.taskUrl,obj);
      }
    
  deleteTask(id:any){
    return this.httpClient.delete<{msg:string}>(`${this.taskUrl}/${id}`);
      }
  getTaskForEmployee(employee:any){
    return this.httpClient.get<{tasks:any}>(`${this.taskUrl+"/employee"}/${employee}`);
  }    

  refuseTask(id:any){
    return this.httpClient.get<{isUpdated:boolean}>(`${this.taskUrl+"/refuseTask"}/${id}`);

  }

  acceptTask(id:any){
    return this.httpClient.get<{isUpdated:boolean}>(`${this.taskUrl+"/acceptTask"}/${id}`);

  }
}
