import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/servicio/crud.service';
import { Router ,ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/servicio/Usuario';
@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
usuario?:Usuario;
id:any;
formularioDeUsuarios:FormGroup;

  constructor(
    private ruteador:Router,
    private formulario:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private crudService:CrudService
  ) {this.id=this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    this.crudService.ObtenerUsuario(this.id).subscribe(
      (respuesta)=>{
        this.formularioDeUsuarios.setValue({

          nombre:respuesta['Nombre'],
          email:respuesta['Email']
        })
      },
    );

    this.formularioDeUsuarios=this.formulario.group({
      nombre:['', Validators.required],
      email:['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  ActualizarDatos():any{
    console.log(this.id);
    console.log(this.formularioDeUsuarios.value);
    this.usuario = new Usuario(this.id, this.formularioDeUsuarios.value['nombre'], this.formularioDeUsuarios.value['email']);
    this.crudService.ActualizarUsuario(this.usuario).subscribe((respuesta)=>{
      this.ruteador.navigateByUrl('/listar-usuarios');
    });
  }

}
