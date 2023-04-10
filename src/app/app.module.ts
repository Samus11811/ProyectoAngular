import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AgregarUsuarioComponent } from './componentes/agregar-usuario/agregar-usuario.component';
import { ListarUsuariosComponent } from './componentes/listar-usuarios/listar-usuarios.component';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CrudService } from './servicio/crud.service';
import { CrudComponent } from './componentes/crud/crud.component';
import { PaginaComponent } from './aplicacion/pagina/pagina.component';
import { CabeceraComponent } from './aplicacion/cabecera/cabecera.component';
import { PieDePaginaComponent } from './aplicacion/pie-de-pagina/pie-de-pagina.component';
import { MostrarJuegosComponent } from './aplicacion/mostrar-juegos/mostrar-juegos.component';
import { SliderJuegosOfertadosComponent } from './aplicacion/slider-juegos-ofertados/slider-juegos-ofertados.component';
import { JoyasDeLaSemanaComponent } from './aplicacion/joyas-de-la-semana/joyas-de-la-semana.component';
import { CookieService } from 'ngx-cookie-service';
import { LandingPageComponent } from './aplicacion/pagina/landing-page/landing-page.component';
import { LoginComponent } from './aplicacion/login/login.component';
import { RegistroComponent } from './aplicacion/login/registro/registro.component';

import { HotToastModule } from '@ngneat/hot-toast';
import { BusquedaComponent } from './aplicacion/busqueda/busqueda.component';
import { ProductoComponent } from './aplicacion/producto/producto.component';
import { CarritoComponent } from './aplicacion/carrito/carrito.component';
import { ProcesarCompraComponent } from './aplicacion/procesar-compra/procesar-compra.component';
import { NgxPayPalModule } from 'ngx-paypal';



@NgModule({
  declarations: [
    AppComponent,
    AgregarUsuarioComponent,
    ListarUsuariosComponent,
    EditarUsuarioComponent,
    CrudComponent,
    PaginaComponent,
    CabeceraComponent,
    PieDePaginaComponent,
    MostrarJuegosComponent,
    SliderJuegosOfertadosComponent,
    JoyasDeLaSemanaComponent,
    LandingPageComponent,
    LoginComponent,
    RegistroComponent,
    BusquedaComponent,
    ProductoComponent,
    CarritoComponent,
    ProcesarCompraComponent
  ],
  imports: [
    NgxPayPalModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HotToastModule.forRoot({position: 'bottom-center',  style: {
      border: '1px solid #F55D07',
      padding: '16px',
      color: 'white',
      background: '#636363',
    },})
  ],
  providers: [CookieService,CrudService, { provide: LOCALE_ID,
    useValue: 'fr'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
