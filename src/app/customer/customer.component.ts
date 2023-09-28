import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../Components/Service/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit{

  loggedInUser:any;
  applicationForm : any ;
  formFlag:boolean =false;
  statusFlag :boolean =false;
  statusFlag1 :boolean =false;

  statusForm:any;
  Applications: any;
  applicationId: any;
  applyApp:any;
  appFlag: boolean = false;
  applData: any;
  applicationStatus: any;
  constructor(private route: ActivatedRoute,private router :Router, private us: UserService,private http:HttpClient){}

  ngOnInit(): void {
     this.route.params.subscribe((param)=>{
      console.log("params",param)
      this.loggedInUser = param["userName"];
      // console.log("params", this.loggedInUser )
    })

    this.applicationForm = new FormGroup({
      fullName : new FormControl("",Validators.required),
      fatherName : new FormControl("", [Validators.required]),
      email: new FormControl("",Validators.required),
      gender : new FormControl("",Validators.required),
      dob : new FormControl("",Validators.required),
      highEdu : new FormControl(),
      mobileNum: new FormControl("",Validators.required),
      maritalStatus: new FormControl(),
      job:new FormControl(),
      mIncome: new FormControl("",Validators.required),
      aIncome: new FormControl(),
      cardSec : new FormControl("",Validators.required),
      date :new FormControl("",Validators.required),
      sign : new FormControl("",Validators.required),
      approvalDate: new FormControl(""),
      applStatus: new FormControl("")
    })


    this.statusForm = new FormGroup({
      "fullName": new FormControl("",Validators.required),
      "email": new FormControl("",Validators.required)
    })

    this.applyApp = new FormGroup({
      "fullName": new FormControl(""),
      "email": new FormControl(""),
      "gender": new FormControl(""),
      "dob": new FormControl(""),
      "mobileNum": new FormControl(""),
      "mIncome": new FormControl(""),
      "aIncome": new FormControl(""),
      "date": new FormControl(""),
      "approvalDate": new FormControl(""),
      "applStatus": new FormControl("")
    })

    
  }


  statusData(data:any){
    console.log("DAta ",data)
  this.applyApp.get("fullName").setValue(data.fullName);
  this.applyApp.get("email").setValue(data.email);
  this.applyApp.get("gender").setValue(data.gender);
  this.applyApp.get("dob").setValue(data.dob);
  this.applyApp.get("mobileNum").setValue(data.mobileNum);
  this.applyApp.get("mIncome").setValue(data.mIncome);
  this.applyApp.get("aIncome").setValue(data.aIncome);
  this.applyApp.get("date").setValue(data.date);
  this.applyApp.get("approvalDate").setValue((data.approvalDate!="")?data.approvalDate:"Waiting for Admin Approval.....");
  this.applyApp.get("applStatus").setValue((data.applStatus!="")?data.applStatus:"Waiting for Admin Approval.....");
  }

  getForm(){
    this.formFlag = true;
    this.statusFlag =false;
    this.statusFlag1 = false;
  }

  CheckStatus(){
    this.statusFlag1 = true;
    this.formFlag = false;
    this.statusFlag = false;
    this.us.getallApplications().subscribe((res)=>{
      this.Applications = res;
      console.log( this.Applications)
    })
  }

  submitApplication(){
    console.log("appldata",this.applicationForm.value)
    this.us.applyCard(this.applicationForm.value).subscribe((res)=>{
      alert("application submited Sucessfully....")
      console.log("application data", res)
      this.formFlag = false;
    this.statusFlag =false;
    this.statusFlag1 = false;
    });
  }

  check(){
    this.formFlag = false;
   
    this.appFlag =false;
    let formData = this.statusForm.value;
    console.log("statusForm data: ",formData);

    this.applData = this.Applications.filter((ele: any)=>{
      if(ele.fullName == formData.fullName && ele.email == formData.email){
        this.appFlag =true;
        this.statusFlag1 = false;
        this.applicationId = ele.id;
        this.applicationStatus = ele.applStatus;
        return ele;
      }   
  })

  console.log("aPPLICATION DATA :",this.applicationId)
    if(this.appFlag &&  this.applicationStatus =="Approved"){
      alert("Your Application approved ....")
      this.statusFlag =true;
      this.us.getApplication(this.applicationId).subscribe((res)=>{
        // console.log(res);

        this.statusData(res);
      })
      
    }
    else if(this.appFlag &&  this.applicationStatus =="Rejected"){
      alert("Application is Rejected...")
      this.statusFlag =true;
      this.us.getApplication(this.applicationId).subscribe((res)=>{
        // console.log(res);

        this.statusData(res);
      })
    }
    else if(this.appFlag &&  this.applicationStatus ==""){
      alert("Application is pending for approval...")
      this.statusFlag =true;
      this.us.getApplication(this.applicationId).subscribe((res)=>{
        // console.log(res);

        this.statusData(res);
      })
    }
    else{
      alert("You are not Applied..");
      this.statusFlag =false;
    }
  }

  statusReset(){
    this.statusForm.reset();
  }
}
