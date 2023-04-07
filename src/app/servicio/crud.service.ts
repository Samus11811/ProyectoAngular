import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './Usuario';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
Servidor: string='http://localhost/proyectoAngular/procesarCrud.php/';
  constructor(public clienteHttp:HttpClient) { }

AgregarUsuario(datosUsuario:Usuario):Observable<any>{
  return this.clienteHttp.post(this.Servidor+"?task=add",JSON.stringify(datosUsuario), { responseType: "text"});
}

ObtenerUsuarios(){
  return this.clienteHttp.get(this.Servidor+"?task=get");
}

BorrarUsuario(idUsuario:any):Observable<any>{
  return this.clienteHttp.post(this.Servidor+"?task=delete",idUsuario, { responseType: "text"});
}


ObtenerUsuario(idUsuario:any):Observable<any>{
  return this.clienteHttp.post(this.Servidor+"?task=show",idUsuario);
}
ActualizarUsuario(datosUsuario:Usuario):Observable<any>{
  return this.clienteHttp.post(this.Servidor+"?task=update",JSON.stringify(datosUsuario), { responseType: "text" });
}

ObtenerVideojuegos(filtro:any):Observable<any>{
  return this.clienteHttp.get(this.Servidor+"?task=get-videogames&filter="+filtro);
}
ObtenerPlataformasDelVideojuego(NombreVideojuego:any):Observable<any>{
  return this.clienteHttp.get(this.Servidor+"?task=get-plataforms-of-the-game&videogameName="+NombreVideojuego);
}

ObtenerEdicionDelVideojuego(IdVideojuego:any):Observable<any>{
  return this.clienteHttp.get(this.Servidor+"?task=get-editions-of-the-game&videogameId="+IdVideojuego);
}
ObtenerGenerosDelVideojuego(id:any):Observable<any>{
  return this.clienteHttp.get(this.Servidor+"?task=get-genres-of-the-videogame&videogameId="+id);
}
ObtenerImagenesDelVideojuego(id:any):Observable<any> {
  return this.clienteHttp.get(this.Servidor+"?task=get-images-of-the-videogame&videogameId="+id);
}

ObtenerVideojuego(id:any):Observable<any>{
  return this.clienteHttp.post(this.Servidor+"?task=get-videogame",id);
}
ObtenerVideojuegosFiltrados(filtros:any):Observable<any>{
  return this.clienteHttp.post(this.Servidor+"?task=get-videogames-filter",filtros);
}
ObtenerVideojuegosElegidos(Parnerid:any):Observable<any>{
  return this.clienteHttp.post(this.Servidor+"?task=get-videogames-parner",Parnerid);
}
ObtenerVideojuegosFiltradosPorNombre(busqueda:any) {
  return this.clienteHttp.get(this.Servidor+"?task=get-videogames-name&q="+busqueda);
}
ObtenerConversion(moneda:any):Observable<any>{
  return this.clienteHttp.post(this.Servidor+"?task=get-conversion",JSON.stringify(moneda));
}

ObtenerTodasConversiones():Observable<any>{
  return this.clienteHttp.get(this.Servidor+"?task=get-all-conversions");
}
Login(datosUsuario:Usuario):Observable<any>{
  console.log(datosUsuario);
  return this.clienteHttp.post(this.Servidor+"?task=login",JSON.stringify(datosUsuario));
}
CambiarImagen(file:File,nombre:any):Observable<any>{
  const formData: FormData = new FormData();
  formData.set('imagen', file, file.name);
  formData.append('nombre', nombre);
  return this.clienteHttp.post(this.Servidor+"?task=change-profile-picture", formData);
}



}
