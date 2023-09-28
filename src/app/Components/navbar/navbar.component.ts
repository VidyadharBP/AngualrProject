import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit{

  @ViewChild(LoginComponent,{static:false}) loggedInFlag: any;
  loggedin:any;
  constructor(private route:Router){}
  ngAfterViewInit(): void {
   this.loggedin = this.loggedInFlag
   console.log(this.loggedin)
  }


  ngOnInit(): void {
  }


  logoutUser(){
    localStorage.removeItem("userRole")
    localStorage.removeItem("loggedIn")
    this.route.navigate(["/"])
  }
}
