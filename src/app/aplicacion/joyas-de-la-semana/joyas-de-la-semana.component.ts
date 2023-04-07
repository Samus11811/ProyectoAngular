import { Component, OnInit } from '@angular/core';

import { CrudService } from 'src/app/servicio/crud.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-joyas-de-la-semana',
  templateUrl: './joyas-de-la-semana.component.html',
  styleUrls: ['./joyas-de-la-semana.component.css']
})
export class JoyasDeLaSemanaComponent implements OnInit {
Datos:any;
colaborador:any;
Moneda:any =  (this.cookie.get('Currency')) ? JSON.parse(this.cookie.get('Currency'))["Moneda"] : "EUR";
Conversion:any = (this.cookie.get('Currency')) ? JSON.parse(this.cookie.get('Currency'))["Conversion"] : 1;
public showContent: boolean = false;
  constructor(private crudService:CrudService,
    private cookie: CookieService) { }

  ngOnInit(): void {
    this.crudService.ObtenerVideojuegosElegidos("1").subscribe(datos=>{
      this.Datos=datos
      console.log(this.Datos);
      this.colaborador = {
        "Nombre": datos[0].NombreColaborador,
        "Imagen": datos[0].Imagen,
        "Youtube": datos[0].Youtube,
        "Instagram": datos[0].Instagram,
        "Twitch": datos[0].Twitch,
        "Twitter": datos[0].Twitter,
        "Mensaje": datos[0].Mensaje
      }
      setTimeout(()=>this.showContent=true, 100);
    })
  }

}
