import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Components/Service/user.service';
import { user } from 'src/app/Components/model/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent   {

  signupForm: any;
  newUser:user | undefined

  constructor( private userService:UserService, private router :Router, ){}

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      userName : new FormControl("",Validators.required),
      password : new FormControl("", [Validators.required, Validators.minLength(4)]),
      role: new FormControl("",Validators.required),
      firstName : new FormControl(),
      lastName : new FormControl(),
      email : new FormControl(),
      phone: new FormControl()
    })


  }

  formSignUp(){
    let data = this.signupForm.value;
    // console.log(this.signupForm.value);
    this.newUser ={
        "userName": data.userName,
        "password": data.password,
        "role": data.role,
        "firstName": data.firstName,
        "lastName": data.lastName,
        "email": data.email,
        "phoneNumber": data.phone,
        
    }
    this.userService.addUser(this.newUser).subscribe((res)=>{
      if(res){
        alert("user registered sucessfully")
        this.router.navigate(["/login"])
      }
    });
  }
}
