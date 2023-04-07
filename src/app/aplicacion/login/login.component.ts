import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { CookieService } from 'ngx-cookie-service';
import { CrudService } from 'src/app/servicio/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public formularioDeUsuario:FormGroup;
usuario:any;
  constructor(private router:Router,
              private crudService: CrudService,
              private formulario: FormBuilder,
              private toast: HotToastService,
              private cookie: CookieService) {


                this.formularioDeUsuario=this.formulario.group({
                  nombre:['', Validators.required],
                  contra:['', [Validators.required, Validators.minLength(4)]],
                })
               }

  ngOnInit(): void {


  }


  irRegistro() {
    this.router.navigate(['./pagina/registro']);
  }
  login() {
    this.crudService.Login(this.formularioDeUsuario.value).pipe(
      this.toast.observe(
        {
          loading: 'Cargando...',
          success: (s) => 'Bienvenido: ' + s.Nombre,
          error: 'Login incorrecto',
        }
      ),
    ).subscribe((respuesta) =>{

      delete respuesta['Contra'];
       sessionStorage.setItem('Usuario', JSON.stringify(respuesta));
       delete respuesta['Rol'];
       this.cookie.set('Usuario', JSON.stringify(respuesta), { expires: 7, path: "/"});
       window.location.href ="/crud";

    })
  }

}
