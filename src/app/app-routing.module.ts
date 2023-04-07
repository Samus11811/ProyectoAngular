import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgregarUsuarioComponent } from './componentes/agregar-usuario/agregar-usuario.component';
import { ListarUsuariosComponent } from './componentes/listar-usuarios/listar-usuarios.component';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';
import { CrudComponent } from './componentes/crud/crud.component';
import { PaginaComponent } from './aplicacion/pagina/pagina.component';
import { LandingPageComponent } from './aplicacion/pagina/landing-page/landing-page.component';
import { LoginComponent } from './aplicacion/login/login.component';
import { RegistroComponent } from './aplicacion/login/registro/registro.component';
import { AuthGuardService } from './servicio/auth-guard/auth-guard.service';
import { BusquedaComponent } from './aplicacion/busqueda/busqueda.component';
import { ProductoComponent } from './aplicacion/producto/producto.component';
import { CarritoComponent } from './aplicacion/carrito/carrito.component';
const routes: Routes = [
  //acceder a ruta por defecto, redirije a agregar usuario
  {path: '', pathMatch: 'full', redirectTo: 'pagina'},
  //si escribes agregar-empleado en la url, te envia al
  {path: 'crud', component: CrudComponent, canActivate: [AuthGuardService],
  children: [{path: '', pathMatch: 'full', redirectTo: 'listar-usuarios'},
  {path: 'agregar-usuario', component:AgregarUsuarioComponent},
  {path: 'listar-usuarios', component:ListarUsuariosComponent},
  {path: 'editar-usuario/:id', component:EditarUsuarioComponent}]

},
{path: 'pagina', component: PaginaComponent,
children: [{path: '', pathMatch: 'full', redirectTo: 'landing-page'},
{path: 'landing-page', component:LandingPageComponent},
{path: 'login', component:LoginComponent },
{path: 'registro', component:RegistroComponent},
{path: 'busqueda/:plataforma', component: BusquedaComponent},
{path: 'busqueda/:plataforma/:busqueda', component: BusquedaComponent},
{path: 'busqueda/:busqueda', component: BusquedaComponent},
{path: 'busqueda', component: BusquedaComponent},
{path: 'producto', component: LandingPageComponent},
{path: 'producto/:id', component: ProductoComponent},
{path: 'carrito', component: CarritoComponent},
]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
