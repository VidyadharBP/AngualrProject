import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  role:any;
  constructor(private http: HttpClient) { }

  // getRole(){
  //   return this.role;
  // }
  userrole(role:any){
    this.role = role
  }
}
