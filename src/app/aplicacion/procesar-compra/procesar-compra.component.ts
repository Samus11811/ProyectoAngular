import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { CookieService } from 'ngx-cookie-service';
import { ICreateOrderRequest } from "ngx-paypal";
import { timeout } from 'rxjs';

@Component({
  selector: 'app-procesar-compra',
  templateUrl: './procesar-compra.component.html',
  styleUrls: ['./procesar-compra.component.css']
})
export class ProcesarCompraComponent implements OnInit {
  Moneda:any =  (this.cookie.get('Currency')) ? JSON.parse(this.cookie.get('Currency'))["Moneda"] : "EUR";
  valor:any = sessionStorage.getItem('pagar');
  carrito:any;
  valorTotal:any;
valorDescontado:any;
valorsubTotal:any;
  Conversion:any = (this.cookie.get('Currency')) ? JSON.parse(this.cookie.get('Currency'))["Conversion"] : 1;
  public payPalConfig: any;
  public showPaypalButtons: boolean = false;
  constructor(private cookie: CookieService,
              private toast: HotToastService,
              private router:Router) { }

  ngOnInit(): void {
    this.carrito = JSON.parse(sessionStorage.getItem('carrito')!);
    this.calcularPrecio();
    this.payPalConfig = {
      currency: this.Moneda,
      clientId: "AZbEeH16v7KC_7H1631EiRcQAgHhEpW5gmUNDxSharXkuJ5OM9n7lD_3n52HeGEvNG-uz7cF3twSL_OP",
      createOrder: (data:any) =>
        <ICreateOrderRequest>{
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: this.Moneda,
                value: this.valor,
                breakdown: {
                  item_total: {
                    currency_code: this.Moneda,
                    value: this.valor
                  }
                }
              },
              items: [
                {
                  name: "Enterprise Subscription",
                  quantity: "3",
                  category: "DIGITAL_GOODS",
                  unit_amount: {
                    currency_code: this.Moneda,
                    value: this.valor
                  }
                }
              ]
            }
          ]
        },
      advanced: {
        commit: "true"
      },
      style: {
        label: "paypal",
        layout: "vertical"
      },
      onApprove: (data:any, actions:any) => {
        console.log(
          "onApprove - transaction was approved, but not authorized",
          data,
          actions
        );
        actions.order.get().then((details:any) => {
          console.log(
            "onApprove - you can get full order details inside onApprove: ",
            details
          );
        });
      },
      onClientAuthorization: (data:any) => {
        sessionStorage.removeItem('carrito');
        sessionStorage.removeItem('pagar');
        setTimeout(()=> this.router.navigate(['../pagina']), 1000);
        this.toast.success("¡Compra realizada! gracias :)");
      },
      onCancel: (data:any, actions:any) => {
        console.log("OnCancel", data, actions);
      },
      onError: (err:any) => {
        console.log("OnError", err);
      },
      onClick: (data:any, actions:any) => {
        console.log("onClick", data, actions);
      }
    };


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

  pay() {
    this.showPaypalButtons = true;
  }

  back(){
    this.showPaypalButtons = false;
  }

}
