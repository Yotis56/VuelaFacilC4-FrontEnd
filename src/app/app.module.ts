import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderprincipalComponent } from './components/headerprincipal/headerprincipal.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { VuelosComponent } from './components/vuelos/vuelos.component';
import { FooterprincipalComponent } from './components/footerprincipal/footerprincipal.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { IndexComponent } from './components/admin/index/index.component';
import { HeaderAdminComponent } from './components/admin/header-admin/header-admin.component';
import { AvionesComponent } from './components/admin/aviones/aviones.component';
import { DestinosComponent } from './components/admin/destinos/destinos.component';
import { AgregarVuelosComponent } from './components/admin/agregar-vuelos/agregar-vuelos.component';
import { ConsultarReservasComponent } from './components/admin/consultar-reservas/consultar-reservas.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderprincipalComponent,
    InicioComponent,
    VuelosComponent,
    FooterprincipalComponent,
    CheckoutComponent,
    NosotrosComponent,
    ReservasComponent,
    IndexComponent,
    HeaderAdminComponent,
    AvionesComponent,
    DestinosComponent,
    AgregarVuelosComponent,
    ConsultarReservasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
