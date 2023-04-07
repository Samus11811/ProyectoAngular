import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/servicio/crud.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
formularioDeBusqueda:FormGroup;
plataforma:any;
busqueda:any;
Videojuegos:any;
links:any = false;

ActualizarPlataforma:any;
Moneda:any =  (this.cookie.get('Currency')) ? JSON.parse(this.cookie.get('Currency'))["Moneda"] : "EUR";
Conversion:any = (this.cookie.get('Currency')) ? JSON.parse(this.cookie.get('Currency'))["Conversion"] : 1;
  constructor(private activatedRoute: ActivatedRoute,
              private crudService: CrudService,
              private cookie: CookieService,
              private formulario:FormBuilder) {
              this.busqueda=this.activatedRoute.snapshot.paramMap.get('busqueda');

                this.plataforma=this.activatedRoute.snapshot.paramMap.get('plataforma');
                if(sessionStorage.getItem('busqueda')) {
                  this.crudService.ObtenerVideojuegosFiltrados(JSON.parse(sessionStorage.getItem('busqueda')!)).subscribe((respuesta) =>{
                    this.Videojuegos = respuesta;
                    this.plataforma = JSON.parse(sessionStorage.getItem('busqueda')!)['plataforma'];
                    sessionStorage.removeItem('busqueda');
                  })
                } else if(this.plataforma == null) {
                  this.crudService.ObtenerVideojuegosFiltradosPorNombre(this.busqueda).subscribe((respuesta)=>{
                    this.Videojuegos= respuesta;
                    this.links=true;

                  })
                } else {
                  this.ActualizarPlataforma = {
                    "plataforma": this.plataforma,
                    "conversion": this.Conversion,
                    "stock": 1,
                  }


                  this.crudService.ObtenerVideojuegosFiltrados(this.ActualizarPlataforma).subscribe((respuesta)=>{
                    this.Videojuegos= respuesta;
                    console.log(this.Videojuegos);
                  })
                }

                this.formularioDeBusqueda=this.formulario.group({
                  plataforma:[''],
                  genero:[''],
                  min:[''],
                  max:[''],
                  stock:[''],
                  tipo:[''],
                  conversion:[this.Conversion],
                  ordenar:['']
                })
              this.formularioDeBusqueda.setValue({
                  plataforma:[this.plataforma],
                  genero:[''],
                  min:[''],
                  max:[''],
                  stock:[true],
                  tipo:[''],
                  conversion:[this.Conversion],
                  ordenar:['']
                },);


                setInterval( () =>{this.ngOnInit();}, 1000);
               }

  ngOnInit(): void {
    if(this.plataforma !=this.activatedRoute.snapshot.paramMap.get('plataforma') || this.busqueda != this.activatedRoute.snapshot.paramMap.get('busqueda')) {
      window.location.reload();
    } else {

    }

  }


  buscar() {
/*     this.crudService.ObtenerVideojuegosFiltrados(this.formularioDeBusqueda.value).subscribe((respuesta) =>{
      sessionStorage.setItem('busqueda', JSON.stringify(respuesta[0]));

       window.location.reload();
    }) */
    sessionStorage.setItem('busqueda', JSON.stringify(this.formularioDeBusqueda.value));
    window.location.href ="/pagina/busqueda/"+this.formularioDeBusqueda.value['plataforma'];
  }
  stock(event:any) {
    if(event.target.checked) {
      this.formularioDeBusqueda.setValue({
        stock:[true]
      });
    } else {
      this.formularioDeBusqueda.setValue({
        stock:[false]
      });
    }
  }
}
