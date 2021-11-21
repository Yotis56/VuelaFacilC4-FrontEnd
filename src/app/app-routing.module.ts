import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarVuelosComponent } from './components/admin/agregar-vuelos/agregar-vuelos.component';
import { AvionesComponent } from './components/admin/aviones/aviones.component';
import { ConsultarReservasComponent } from './components/admin/consultar-reservas/consultar-reservas.component';
import { DestinosComponent } from './components/admin/destinos/destinos.component';
import { IndexComponent } from './components/admin/index/index.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { VuelosComponent } from './components/vuelos/vuelos.component';


const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'vuelos', component: VuelosComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'nosotros', component: NosotrosComponent},
  {path: 'reservas', component: ReservasComponent},
  {path: 'admin', component: IndexComponent},
  {path: 'admin/aviones', component: AvionesComponent},
  {path: 'admin/destinos', component: DestinosComponent},
  {path: 'admin/reservas', component: ConsultarReservasComponent},
  {path: 'admin/vuelos', component: AgregarVuelosComponent},
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
