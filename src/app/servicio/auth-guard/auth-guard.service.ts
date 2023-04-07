import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Usuario } from '../Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
canActivate() : boolean {
 const usuario = JSON.parse(sessionStorage.getItem('Usuario')!);
  if(((usuario.Rol == 'Admin') && usuario  ? true : false )) {
    sessionStorage.removeItem('Usuario');
    return true;
  } else {
    sessionStorage.removeItem('Usuario');
    this.router.navigateByUrl("/pagina");
    return false;
  }


}
  constructor(private router:Router) { }
}
