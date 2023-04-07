import { Component, OnInit } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

registerLocaleData(localeFr);

import { CrudService } from 'src/app/servicio/crud.service';
@Component({
  selector: 'app-mostrar-juegos',
  templateUrl: './mostrar-juegos.component.html',
  styleUrls: ['./mostrar-juegos.component.css']
})
export class MostrarJuegosComponent implements OnInit {
Videojuegos:any;
Moneda:any =  (this.cookie.get('Currency')) ? JSON.parse(this.cookie.get('Currency'))["Moneda"] : "EUR";
Conversion:any = (this.cookie.get('Currency')) ? JSON.parse(this.cookie.get('Currency'))["Conversion"] : 1;
public showContent: boolean = false;
  constructor(private crudService:CrudService,
    private cookie: CookieService) { }

  ngOnInit(): void {
    this.crudService.ObtenerVideojuegos("id DESC").subscribe(datos=>{
      this.Videojuegos=datos;
    });
    setTimeout(()=>this.showContent=true, 100);

  }

}
