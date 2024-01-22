import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string ="http://localhost:3003/users";
  constructor(private httpClient: HttpClient) { }

  login(user:any){
    return this.httpClient.post<{msg:string, token:string}>(this.userUrl +"/login",user);
  }

  signup(user:any){
    return this.httpClient.post<{msg:string}>(this.userUrl +"/signup",user);
  }

  getAllUsers(){
    return this.httpClient.get<{users:any}>(this.userUrl);
  }
}
