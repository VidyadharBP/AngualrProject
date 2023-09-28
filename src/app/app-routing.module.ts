import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { CustomerComponent } from './customer/customer.component';
import { AdminCardApprovalComponent } from './admin-card-approval/admin-card-approval.component';
import { PagenotFoundComponent } from './pagenot-found/pagenot-found.component';
import { customerGuard } from './Components/Service/customer.guard';
import { adminGuard } from './Components/Service/admin.guard';
import { preventbackGuard } from './preventback.guard';
const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
  },
  {
    path:"login",
    component:LoginComponent,
  },
  {
    path:"signup",
    component:SignUpComponent,
  },
  {
    path:"customer/:userName",
    component:CustomerComponent,
    canActivate:[customerGuard],
    canDeactivate:[preventbackGuard]
  },
  {
    path:"adminCardApprove",
    component:AdminCardApprovalComponent,
    canActivate:[adminGuard],
    canDeactivate:[preventbackGuard]
  },
  {
    path:"not-found",
    component:PagenotFoundComponent
  },
  {
    path:"**", redirectTo:'/not-found'
  }
    
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
