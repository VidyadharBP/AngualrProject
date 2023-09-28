import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  let userRole = localStorage.getItem("userRole");
  if(userRole == "admin"){
    return true;
  }
 else{
  alert("Customer can't access next page only Admin has Access..")
  return false;
 }
};
