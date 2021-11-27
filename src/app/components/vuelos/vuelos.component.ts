import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vuelos } from 'src/app/models/VueloInterface';
import { InicioService } from 'src/app/services/inicio/inicio.service';


@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.scss']
})
export class VuelosComponent implements OnInit {
  public initialQuery
  public vuelosIda: any
  public vuelosVuelta: any
  public fechasIda!: Date[];
  public fechaVuelta?: Date;


  constructor(private router: Router, private inicioService: InicioService) {
    const sessionData = window.sessionStorage.getItem('initialQuery');
    if (typeof (sessionData) === 'string') {
      this.initialQuery = JSON.parse(sessionData)
    } else {
      this.initialQuery = null
      //si sessionData es null, es porque se llegó a la pagina sin pasar por el inicio. debería mandar allá
      this.router.navigate(['/'])
    }


  }

  async ngOnInit(): Promise<void> {
    if (this.initialQuery) {
      const queryIda = {
        'IATASalida': this.initialQuery.origen,
        'IATALlegada': this.initialQuery.destino,
        'fecha': this.initialQuery.fechaSalida
      }
      this.vuelosIda = await this.buscarVuelos(queryIda)
      this.fechasIda = this.vuelosIda.map((vuelo: Vuelos) => new Date(vuelo.fechaVuelo))
      if (this.initialQuery.IdaVuelta) {
        const queryVuelta = {
          'IATASalida': this.initialQuery.destino,
          'IATALlegada': this.initialQuery.ida,
          'fecha': this.initialQuery.fechaLlegada
        }
        this.vuelosVuelta = this.buscarVuelos(queryVuelta)
      }
    }
  }

  public async buscarVuelos(query: { IATASalida: string; IATALlegada: string; fecha: string; }): Promise<Array<any>> {
    try {
      const response = await this.inicioService.buscarVuelos(query)
      console.log(response)
      return response
    } catch (error) {
      console.error(error)
      return []
    }
  }
}
