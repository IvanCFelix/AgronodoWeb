import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    public router:Router
  ) {}
  canActivate(): boolean {
      if (this.auth.estaAutenticado()) {
        return true;
      }else{
         this.router.navigateByUrl("/login");
      }
  
  }
  
}
