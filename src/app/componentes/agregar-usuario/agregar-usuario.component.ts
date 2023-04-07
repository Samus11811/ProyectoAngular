import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CrudService } from 'src/app/servicio/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {
  public formularioDeUsuarios:FormGroup;




  constructor(private formulario:FormBuilder,
              private crudService: CrudService,
              private ruteador:Router
     ) {



    this.formularioDeUsuarios=this.formulario.group({
      nombre:['', Validators.required],
      email:['', Validators.required],
      contra:['', [Validators.required, Validators.minLength(4)]]
    })

  }

  ngOnInit(): void {
  }
  enviarDatos():any {
    this.crudService.AgregarUsuario(this.formularioDeUsuarios.value).subscribe((respuesta)=>{
      this.ruteador.navigateByUrl('/listar-usuarios');
    });


  }
}
