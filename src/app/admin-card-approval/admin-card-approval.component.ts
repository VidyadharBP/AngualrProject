import { Component, OnInit } from '@angular/core';
import { UserService } from '../Components/Service/user.service';

@Component({
  selector: 'app-admin-card-approval',
  templateUrl: './admin-card-approval.component.html',
  styleUrls: ['./admin-card-approval.component.css']
})
export class AdminCardApprovalComponent implements OnInit{

  ApplicationData:any;
  constructor(private us:UserService){}

  ngOnInit(): void {
    this.us.getallApplications().subscribe((res)=>{
      console.log("All Application",res)
      this.ApplicationData = res;
    })
  }

  approveform(data:any){
    console.log("row data",data);
    data.applStatus = "Approved";
    data.approvalDate = new Date().toJSON().slice(0, 10);
    this.us.updateApplication(data.id,data).subscribe((res)=>{
      alert("Application has approved...")
      console.log("data updated ",res);
    })
  }

  rejectForm(val:any){
    val.applStatus = "Rejected";
    val.approvalDate = new Date().toJSON().slice(0, 10);
    this.us.updateApplication(val.id,val).subscribe((res)=>{
      alert("Application has Rejected...")
      console.log("data updated ",res);
    })

  }

}
