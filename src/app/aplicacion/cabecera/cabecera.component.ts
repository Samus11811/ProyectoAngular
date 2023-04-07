import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { CookieService } from 'ngx-cookie-service';
import { CrudService } from 'src/app/servicio/crud.service';


@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
fileToUpload: File | null = null;
busqueda:any;
  usuarioCookie:any = (this.cookie.get('Usuario')) ? JSON.parse(this.cookie.get('Usuario')) : null;
  constructor(private cookie: CookieService,
              private crudService: CrudService,
              private toast: HotToastService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onFileSelected(event:any) {

    this.fileToUpload =  event.target.files[0];

    if (this.fileToUpload) {



        setTimeout(() =>{ this.crudService.CambiarImagen(this.fileToUpload!,this.usuarioCookie.Nombre).pipe(
          this.toast.observe(
            {
              loading: 'Cargando...',
              success: '¡Imagen subida con exito!',
              error: 'No hemos podido subir la imagen :C',
            }
        )).subscribe(() =>{
         let nuevoUsuario = {
            'Id': this.usuarioCookie.Id,
            'Nombre': this.usuarioCookie.Nombre,
            'Email': this.usuarioCookie.Email,
            'Imagen':'imagenesUsuarios/'+this.usuarioCookie.Nombre+".png"
          }
          this.cookie.set('Usuario', JSON.stringify(nuevoUsuario) , { expires: 7, path: "/"});
          window.location.reload();
        })}, 1000);




    }
}
 Deslogeo():void {
 this.cookie.delete('Usuario', "/")
  window.location.reload();
 }

 Busqueda() {
  console.log(this.busqueda);
this.router.navigate(['pagina/busqueda', {busqueda:this.busqueda}])
 }



}
