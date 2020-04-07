import { AuthService } from './../Services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from "sweetalert2";


@Injectable()
export class RoleGuard implements CanActivate {


    constructor(private _authService: AuthService, private _router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const user = JSON.parse(window.localStorage.getItem('USER'));
        if (user.user_type === next.data.role || next.data.role2) {
            return true;
        } else {
            Swal.fire({
                text: "No tienes acceso a esta pantalla",
                showConfirmButton: false,
                width: '250px',
                timer: 2500
            });

            this._router.navigate(['/home']);
        }
        // navigate to not found page   


    }

}