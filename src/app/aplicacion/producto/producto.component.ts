import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { CookieService } from 'ngx-cookie-service';
import { CrudService } from 'src/app/servicio/crud.service';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
id:any;
Videojuego:any;
Desarollador:any;
Distribuidor:any;
Portada:any;
Precio:any;
Descuento:any;
Miniatura:any;
Nombre:any;
Plataforma:any;
Sintaxis:any;
Stock:any;
Video:any;
elegirPlataforma:any;
valorElegirPlataforma:any;
valorElegirEdicion:any;
ediciones:any;
DLCde:any;
generos:any;
imagen1:any;
imagen2:any;
imagen3:any;
imagen4:any;
imagen5:any;
VideojuegoConCantidad:any;
Moneda:any =  (this.cookie.get('Currency')) ? JSON.parse(this.cookie.get('Currency'))["Moneda"] : "EUR";
Conversion:any = (this.cookie.get('Currency')) ? JSON.parse(this.cookie.get('Currency'))["Conversion"] : 1;
  constructor(private activatedRoute:ActivatedRoute,
    private crudService:CrudService,
    private cookie:CookieService,
    private router:Router,
    public sanitizer: DomSanitizer,
    private toast: HotToastService) {this.id=this.activatedRoute.snapshot.paramMap.get('id');
this.crudService.ObtenerVideojuego(this.id).subscribe((respuesta) =>{
  this.Videojuego = respuesta[0];
  this.Desarollador = respuesta[0].Desarollador;
  this.Portada = respuesta[0].Portada;
  this.Precio = respuesta[0].Precio;
  this.Descuento = respuesta[0].Descuento;
  this.Miniatura = respuesta[0].Miniatura;
  this.Nombre = respuesta[0].Nombre;
  this.Plataforma = respuesta[0].Plataforma;
  this.Sintaxis = respuesta[0].Sintaxis;
  this.Stock = respuesta[0].Stock;
  this.Distribuidor = respuesta[0].Distribuidor;
  this.DLCde = respuesta[0].DLCde;
  this.generos = respuesta[0].Generos;
  this.Video = this.sanitizer.bypassSecurityTrustResourceUrl(respuesta[0].Video);


  this.crudService.ObtenerGenerosDelVideojuego(this.generos).subscribe((respuesta) =>{
    this.generos = respuesta;


  });

  this.crudService.ObtenerPlataformasDelVideojuego(this.Nombre).subscribe((respuesta) =>{
    this.elegirPlataforma = respuesta;
    this.valorElegirPlataforma = this.id;


  });
  this.crudService.ObtenerEdicionDelVideojuego(this.id).subscribe((respuesta) =>{
    this.ediciones = respuesta;
    this.valorElegirEdicion = this.id;
  });

  this.crudService.ObtenerImagenesDelVideojuego(this.id).subscribe((respuesta) =>{
    this.imagen1 = respuesta[0]['imagen'];
    this.imagen2 = respuesta[1]['imagen'];
    this.imagen3 = respuesta[2]['imagen'];
    this.imagen4 = respuesta[3]['imagen'];
    this.imagen5 = respuesta[4]['imagen'];


  })

});


}

CambiarProductoPlataforma() {

this.router.navigate(['../pagina/producto/'+this.valorElegirPlataforma]);
setTimeout(()=>window.location.reload(), 200);

}


CambiarProductoEdicion() {

  this.router.navigate(['../pagina/producto/'+this.valorElegirEdicion]);
  setTimeout(()=>window.location.reload(), 200);
}
AgregarProductoCesta() {
  this.VideojuegoConCantidad = {
    'nombre': this.Nombre,
    'videojuego': this.Videojuego,
    'cantidad': 1

  }
  if(this.Videojuego.Stock != '0') {


  if(sessionStorage.getItem('carrito')) {
    var carrito = JSON.parse(sessionStorage.getItem('carrito')!);
    if(carrito.find((elemento: any)  => elemento.nombre == this.Nombre)) {
      carrito.find((elemento: any)  => elemento.nombre == this.Nombre).cantidad++;
      console.log(carrito.find((elemento: any)  => elemento.nombre == this.Nombre).cantidad);
      sessionStorage.setItem('carrito',JSON.stringify(carrito));
    } else {
      carrito.push(this.VideojuegoConCantidad);
      sessionStorage.setItem('carrito',JSON.stringify(carrito));
    }

  } else {
    var carrito2: any[] = [
      this.VideojuegoConCantidad
    ]
    console.log(carrito2);
    console.log(JSON.stringify(carrito2));
    sessionStorage.setItem('carrito',JSON.stringify(carrito2));

  }
  this.toast.success('Se ha añadido al carrito');
} else {
  this.toast.error('No hay stock, ¡Lo sentimos!')
}
}

ComprarProducto() {
  if(this.Videojuego.Stock != '0') {
  this.VideojuegoConCantidad = {
    'nombre': this.Nombre,
    'videojuego': this.Videojuego,
    'cantidad': 1

  }
  if(sessionStorage.getItem('carrito')) {
    var carrito = JSON.parse(sessionStorage.getItem('carrito')!);
    if(carrito.find((elemento: any)  => elemento.nombre == this.Nombre)) {
      carrito.find((elemento: any)  => elemento.nombre == this.Nombre).cantidad++;
      console.log(carrito.find((elemento: any)  => elemento.nombre == this.Nombre).cantidad);
      sessionStorage.setItem('carrito',JSON.stringify(carrito));
    } else {
      carrito.push(this.VideojuegoConCantidad);
      sessionStorage.setItem('carrito',JSON.stringify(carrito));
    }

  } else {
    var carrito2: any[] = [
      this.VideojuegoConCantidad
    ]
    console.log(carrito2);
    console.log(JSON.stringify(carrito2));
    sessionStorage.setItem('carrito',JSON.stringify(carrito2));

  }



this.router.navigate(['../pagina/carrito']);
} else {
  this.toast.error('No hay stock, ¡Lo sentimos!')
}

}

  ngOnInit(): void {

  }

}
