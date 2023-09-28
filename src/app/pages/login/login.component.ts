import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Components/Service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: any = FormGroup;
   users :any;
   loginUser : any;
   loggedIn :boolean =false;
   
   @Output() loggedInEvent = new EventEmitter();

  constructor(private router :Router, private us:UserService,){}

  ngOnInit(): void {
    localStorage.removeItem("userRole")
    localStorage.removeItem("loggedIn")
    this.loginForm = new FormGroup({
      userName : new FormControl("",Validators.required),
      password : new FormControl("", [Validators.required, Validators.minLength(4)])
    })

      this.us.getAllUsers().subscribe((res)=>{
        this.users = res;
    });
    
  }

  userLogin(){
    this.loggedIn =false;
    let formData = this.loginForm.value;
    console.log("login user data: ",formData);

    this.loginUser =this.users.filter((ele: any)=>{
      if(ele.userName == formData.userName && ele.password == formData.password){
        // console.log("Login has sucessful..")
        this.loggedIn =true;
        localStorage.setItem("userRole",ele.role)
        localStorage.setItem("loggedIn","true")
        return this.loginUser; 
      }    
  })

  
    if(this.loggedIn){
      // console.log("Login has sucessful..Role", localStorage.getItem("userRole"));
      alert("User Logging sucessfull......")
      let loginFlag = localStorage.getItem("loggedIn");
      this.loggedInEvent.emit(loginFlag);
      if(localStorage.getItem("userRole") == "customer"){
        this.router.navigate(["/customer",formData.userName])
      }
      else if(localStorage.getItem("userRole") == "admin"){
        this.router.navigate(["/adminCardApprove"])
      }
     
    }
    else{
      console.log("Invalid user name and password..");
    }
    
  }

  loginReset(){
    this.loginForm.reset();
  }

  registerUser(){
    this.router.navigate(["/signup"]);
  }
}

