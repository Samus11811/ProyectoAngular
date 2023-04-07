import { Component, OnInit } from '@angular/core';

import { CrudService } from 'src/app/servicio/crud.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-slider-juegos-ofertados',
  templateUrl: './slider-juegos-ofertados.component.html',
  styleUrls: ['./slider-juegos-ofertados.component.css']
})
export class SliderJuegosOfertadosComponent implements OnInit {
Videojuegos:any;
Moneda:any =  (this.cookie.get('Currency')) ? JSON.parse(this.cookie.get('Currency'))["Moneda"] : "EUR";
Conversion:any = (this.cookie.get('Currency')) ? JSON.parse(this.cookie.get('Currency'))["Conversion"] : 1;
public showContent: boolean = false;
  constructor(private crudService:CrudService,
    private cookie:CookieService) { }

  ngOnInit(): void {
    this.crudService.ObtenerVideojuegos("id DESC").subscribe(datos=>{
      this.Videojuegos=datos;
      console.log(this.Videojuegos);
    });
    setTimeout(()=>this.showContent=true, 100);

  }

}
