import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = "http://localhost:3000/user";

  constructor(private http: HttpClient) { }

  addUser(newUser:any){
    return this.http.post(this.baseUrl,newUser);
  }

  getUser(id:any){
    return this.http.get(this.baseUrl+"/"+id);
  }

  getAllUsers(){
    return this.http.get(this.baseUrl);
  }

  applyCard(formData:any){
    return this.http.post("http://localhost:3000/applicationData",formData);
  }

  getallApplications(){
    return this.http.get("http://localhost:3000/applicationData");
  }

  getApplication(id:any){
    return this.http.get("http://localhost:3000/applicationData/"+id);
  }
  updateApplication(id:any,data:any){
    return this.http.put("http://localhost:3000/applicationData/"+id,data);
  }
}
