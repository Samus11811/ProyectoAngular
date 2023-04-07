import { Component, OnInit } from '@angular/core';

import { CrudService } from 'src/app/servicio/crud.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
Usuarios:any;
  constructor(
    private crudService:CrudService
  ) { }

  ngOnInit(): void {
    this.crudService.ObtenerUsuarios().subscribe(datos=>{
      console.log(datos);
      this.Usuarios=datos;
    });
  }

  borrarRegistro(id:any,iControl:any){
    console.log(id);
    console.log(iControl);
    if(window.confirm("¿Desea borrar el registro?")) {
      this.crudService.BorrarUsuario(id).subscribe((respuesta)=>{
        console.log(respuesta);
        this.Usuarios.splice(iControl,1);
      });
    }

  }

}
