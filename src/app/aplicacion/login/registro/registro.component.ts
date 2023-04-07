import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from 'src/app/servicio/crud.service';
import { HotToastService } from '@ngneat/hot-toast';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public formularioDeUsuario:FormGroup;
  usuario:any;

  constructor(private router: Router,
              private crudService: CrudService,
              private formulario:FormBuilder,
              private toast: HotToastService,
              private cookie: CookieService) {

                this.formularioDeUsuario=this.formulario.group({
                  nombre:['', Validators.required],
                  email:['', Validators.required],
                  contra:['', [Validators.required, Validators.minLength(4)]]
                })
               }

  ngOnInit(): void {

  }

  irLogin() {
    this.router.navigateByUrl('pagina/login');
  }

  enviarDatos():any {

    this.crudService.AgregarUsuario(this.formularioDeUsuario.value).pipe(
      this.toast.observe(
        {
          loading: 'Cargando...',
          success: 'Se ha creado correctamente',
          error:  (e) => "Error: " + e.error,
        }
      ),
    ).subscribe((respuesta) =>{
                      let nuevoUsuario = {
                        'Nombre': this.formularioDeUsuario.value['nombre'],
                        'Email': this.formularioDeUsuario.value['email'],
                        'Imagen':'imagenesUsuarios/usuario.png'
                      }
                      this.cookie.set('Usuario', JSON.stringify(nuevoUsuario) , { expires: 7, path: "/"});
                      sessionStorage.setItem("Usuario", JSON.stringify(this.usuario));
                      window.location.href ="/";
    })
  }





}
