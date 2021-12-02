import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vuelos } from 'src/app/models/VueloInterface';
import { InicioService } from 'src/app/services/inicio/inicio.service';
import getPriceFormat from 'src/app/utilities/getPrice';


@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.scss']
})
export class VuelosComponent implements OnInit {
  public initialQuery: any
  public vuelosIda: any
  public vuelosVuelta: any
  public fechasIda!: Date[];
  public fechasVuelta?: Date[];
  public vuelosSeleccionados: any[] = ['', '']


  constructor(private router: Router, private inicioService: InicioService) {

  }

  async ngOnInit() {
    this.getSessionData()
    this.retrieveData()
  }

  public getSessionData() {
    const sessionData = window.sessionStorage.getItem('initialQuery');
    if (typeof (sessionData) === 'string') {
      this.initialQuery = JSON.parse(sessionData)
    } else {
      this.initialQuery = null
      //si sessionData es null, es porque se llegó a la pagina sin pasar por el inicio. debería mandar allá
      this.router.navigate(['/'])
    }
  }

  public async retrieveData(): Promise<void> {
    if (this.initialQuery) {
      const queryIda = {
        'IATASalida': this.initialQuery.origen,
        'IATALlegada': this.initialQuery.destino,
        'fecha': this.initialQuery.fechaSalida
      }
      this.vuelosIda = await this.buscarVuelos(queryIda)
      this.fechasIda = this.vuelosIda.map((vuelo: Vuelos) => new Date(vuelo.fechaVuelo))
      console.log(this.initialQuery.idaVuelta)
      if (this.initialQuery.idaVuelta === 'true') {
        const queryVuelta = {
          'IATASalida': this.initialQuery.destino,
          'IATALlegada': this.initialQuery.origen,
          'fecha': this.initialQuery.fechaLlegada
        }
        this.vuelosVuelta = await this.buscarVuelos(queryVuelta)
        this.fechasVuelta = this.vuelosVuelta.map((vuelo: Vuelos) => new Date(vuelo.fechaVuelo))
      }
    }

  }

  public addHours(index: number, tipo: string): string {
    if (tipo === 'ida') {
      const horaSalida = this.fechasIda[index]
      const horas = this.vuelosIda[index].ruta.duracionVuelo.slice(0, 2)
      const minutes = this.vuelosIda[index].ruta.duracionVuelo.slice(3, 5)
      const horaLlegada = new Date(horaSalida.toISOString())
      horaLlegada.setHours(horaSalida.getHours() + parseInt(horas), horaSalida.getMinutes() + parseInt(minutes))
      return horaLlegada.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (tipo === 'vuelta' && this.fechasVuelta) {
      const horaSalida = this.fechasVuelta[index]
      const horas = this.vuelosVuelta[index].ruta.duracionVuelo.slice(0, 2)
      const minutes = this.vuelosVuelta[index].ruta.duracionVuelo.slice(3, 5)
      const horaLlegada = new Date(horaSalida.toISOString())
      horaLlegada.setHours(horaSalida.getHours() + parseInt(horas), horaSalida.getMinutes() + parseInt(minutes))
      return horaLlegada.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    return ''
  }

  public getDayName(index: number, tipo: string): string {
    //función para obtener el día de un vuelo. 
    let message: string
    if (tipo === 'ida') {
      var nombreDia = this.fechasIda[index].toLocaleString('es-co', { weekday: 'long' })
      let dia = this.fechasIda[index].getDate()
      let mes = this.fechasIda[index].toLocaleString('es-co', { month: 'long' })
      message = `${nombreDia} ${dia} de ${mes}`
      return message
    } else if (tipo === 'vuelta' && this.fechasVuelta) {
      let nombreDia = this.fechasVuelta[index].toLocaleString('es-co', { weekday: 'long' })
      let dia = this.fechasVuelta[index].getDate()
      let mes = this.fechasVuelta[index].toLocaleString('es-co', { month: 'long' })
      message = `${nombreDia} ${dia} de ${mes}`
      return message
    }
    return ''
  }

  getPriceFormat = (distance: number): string => {
    const options = { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }
    let price = distance * 200.353
    return new Intl.NumberFormat('es-CO', options).format(price)
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

  public reservar(type: string, vuelo: any): void {
    //Método que guarda el Id de los vuelos al darle click al botón "Reservar Ahora"
    switch (type) {
      case 'ida':
        if (this.vuelosSeleccionados[0] === vuelo) {
          this.vuelosSeleccionados[0] = ''
        } else {
          this.vuelosSeleccionados[0] = vuelo
        }
        break
      case 'vuelta':
        if (this.vuelosSeleccionados[1] === vuelo) {
          this.vuelosSeleccionados[1] = ''
        } else {
          this.vuelosSeleccionados[1] = vuelo
        }
        break
      default:
        return
    }

  }

  public reservarVuelos() {

    window.sessionStorage.setItem('vuelosSeleccionados', JSON.stringify(this.vuelosSeleccionados))
    this.router.navigate(['checkout'])
  }

}
