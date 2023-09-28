import { CanActivateFn } from '@angular/router';

export const customerGuard: CanActivateFn = (route, state) => {
  let userRole = localStorage.getItem("userRole");
  if(userRole == "customer"){
    return true;
  }
 else{
  alert("Admin can't access next page  only Customer has access..")
  return false;
 }
  
};
