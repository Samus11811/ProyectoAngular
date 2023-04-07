import { Component, OnInit } from '@angular/core';

import { CrudService } from 'src/app/servicio/crud.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-pie-de-pagina',
  templateUrl: './pie-de-pagina.component.html',
  styleUrls: ['./pie-de-pagina.component.css']
})
export class PieDePaginaComponent implements OnInit {
datosCookie:any;
Conversiones:any;
Moneda:any = (this.cookie.get('Currency')) ? JSON.parse(this.cookie.get('Currency'))["Moneda"] : "EUR";
  constructor(
    private crudService:CrudService,
    private cookie: CookieService
    ) { }

  ngOnInit(): void {


    this.crudService.ObtenerTodasConversiones().subscribe(datos=>{
      this.Conversiones=datos;
  });
}


  cambiarMoneda(): void {

    this.crudService.ObtenerConversion(this.Moneda).subscribe(datos=>{
      this.datosCookie = {
        "Moneda": datos[0]['Moneda'],
        "Conversion": datos[0]['Conversion'],
        "Simbolo": datos[0]['Simbolo']
      }

      this.cookie.set('Currency', JSON.stringify(this.datosCookie), { expires: 7, path: "/"});
      console.log(JSON.parse(this.cookie.get('Currency')));
      window.location.reload();
    });


  }

}
