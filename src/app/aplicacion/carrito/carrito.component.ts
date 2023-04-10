import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
carrito:any;
Moneda:any =  (this.cookie.get('Currency')) ? JSON.parse(this.cookie.get('Currency'))["Moneda"] : "EUR";
Conversion:any = (this.cookie.get('Currency')) ? JSON.parse(this.cookie.get('Currency'))["Conversion"] : 1;
valorTotal:any;
valorDescontado:any;
valorsubTotal:any;
disable:any = false;
  constructor(private cookie:CookieService,
    private toast: HotToastService,
    private router:Router) { }

  ngOnInit(): void {

   this.carrito = JSON.parse(sessionStorage.getItem('carrito')!);
   if(this.carrito) {
    this.calcularPrecio();

   } else {
    this.disable = true;
   }
  }

  refresh(Nombre:any, evento:Event) {
    let objetivo = evento.target as HTMLSelectElement;
    console.log(Nombre);
    let index = this.carrito.findIndex((elemento:any) => elemento.nombre == Nombre);
    this.carrito[index].cantidad = objetivo.value;
    console.log(objetivo.value);

    this.carrito = Object.assign([], this.carrito);
    console.log(this.carrito);
    sessionStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.calcularPrecio();
  }
  borrarRegistro(iControl:any) {
    console.log(this.carrito.splice(iControl,1));
    sessionStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.toast.success("Eliminado del carrito correctamente");
    this.calcularPrecio();
  }
  calcularPrecio() {
    this.valorTotal = 0;
    this.valorDescontado = 0;
    this.valorsubTotal = 0;
    for(let elemento of this.carrito){
      this.valorTotal=  this.valorTotal+((Number(elemento.videojuego.Precio)) * elemento.cantidad)/this.Conversion;
      this.valorDescontado= this.valorDescontado+(((Number(elemento.videojuego.Precio)) * (Number(elemento.videojuego.Descuento))) * elemento.cantidad)/this.Conversion;

    }
    this.valorsubTotal= this.valorTotal-this.valorDescontado;
    sessionStorage.setItem('pagar', this.valorsubTotal);
  }
  siguientePaso() {
    if(this.cookie.get('Usuario')) {
      if(this.carrito.length) {
        this.router.navigate(['./pagina/procesar_compra']);
      } else {
        this.router.navigate(['../pagina']);
      }
    } else {
      this.router.navigate(['../pagina/login']);
    }

  }

}
