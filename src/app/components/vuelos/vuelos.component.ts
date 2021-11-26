import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.scss']
})
export class VuelosComponent implements OnInit {
  private initialQuery: {} | null

  constructor() {
    let sessionData = window.sessionStorage.getItem('initialQuery');
    if (typeof (sessionData) === 'string') {
      this.initialQuery = JSON.parse(sessionData)
    } else {
      //si sessionData es null, es porque se llegó a la pagina sin pasar por el inicio. debería mandar allá
      this.initialQuery = null
    }
  }

  ngOnInit(): void {
    if (this.initialQuery) this.buscarVuelos()
  }

  public buscarVuelos() {
    // const queryIda = {
    //   'IATASalida': this.initialQuery.origen,
    //   'IATALlegada': this.initialQuery.destino,
    //   'fecha': this.initialQuery.fechaSalida
    // }
    // try {
    //   const response = await this.inicioService.buscarVuelos(queryIda)
    //   console.log(response)
    // } catch (error) {
    //   console.error(error)
    // }
  }
}
