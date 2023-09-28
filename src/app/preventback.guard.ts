import { CanActivateFn } from '@angular/router';

export const preventbackGuard: CanActivateFn = (route, state) => {

  return window.confirm("You are alredy logged in you want to laeave...");
};
