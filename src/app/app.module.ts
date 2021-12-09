import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

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
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AsientosComponent } from './components/asientos/asientos.component';
import { NetworkInterceptor } from './utilities/networkInterceptor/network.interceptor';

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
    ConsultarReservasComponent,
    AsientosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: NetworkInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
