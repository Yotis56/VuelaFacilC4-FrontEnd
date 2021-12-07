import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Asiento } from 'src/app/models/AsientoInterface';
import { Cliente } from 'src/app/models/ClienteInterface';
import { Reserva } from 'src/app/models/ReservaInterface';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { InicioService } from 'src/app/services/inicio/inicio.service';
import { ReservasService } from 'src/app/services/reservas/reservas.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public vuelos: any[] = []
  public initialQuery: any
  public codigoPromocion: FormControl = new FormControl('')
  public precioTotal: number = 0
  public precioFinal: number = 0
  public hasDiscount: boolean = false
  public clientForm: FormGroup = new FormGroup({})

  constructor(
    private fb: FormBuilder,
    private clientesService: ClientesService,
    private reservasService: ReservasService,
    private inicioService: InicioService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.clientForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      cedula: ['', Validators.required],
      celular: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      barrio: [''],
    })
    this.getSessionData()
    this.getTotalPrice()
  }

  public getSessionData() {
    const vuelosData = window.sessionStorage.getItem('vuelosSeleccionados')
    this.vuelos = typeof (vuelosData) === 'string' ? JSON.parse(vuelosData) : []
    const queryData = window.sessionStorage.getItem('initialQuery')
    this.initialQuery = typeof (queryData) === 'string' ? JSON.parse(queryData) : null
  }

  public getPrice = (distance: number): number => {
    return distance * 200.353 * (this.initialQuery.adultos + this.initialQuery.kids)
  }

  public getPriceFormat = (price: number): string => {
    const options = { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }
    return new Intl.NumberFormat('es-CO', options).format(price)
  }
  public getTotalPrice = () => {
    const pasajeros = (this.initialQuery.adultos + this.initialQuery.kids)
    const precioIda = this.vuelos[0].ruta.distancia * 200.353 * pasajeros
    const precioVuelta = this.vuelos[1] !== '' ? this.vuelos[1].ruta.distancia * 200.353 * pasajeros : 0
    this.precioTotal = precioIda + precioVuelta
    this.precioFinal = this.precioTotal
  }

  aplicarDescuento = () => {
    if (!this.hasDiscount) {
      this.precioFinal = this.precioFinal * 0.7
      this.hasDiscount = true
    }
  }

  esValido(codigo: string): boolean {
    return codigo === 'vuelaFacil30' ? true : false
  }

  private checkValidity() {
    document.querySelectorAll('.cliente-form .form-control').forEach((input) => {
      //let name:string  = input.id
      switch (this.clientForm.controls[input.id].status) {
        case 'INVALID':
          input.classList.add('invalid-input')
          break;
        case 'VALID':
          input.classList.add('valid-input')
          break
        default:
          break;
      }
    })

  }


  private async checkCliente(): Promise<boolean | undefined> {
    //regresa true si el cliente existe, false si no. Y undefined si encontró algún error.
    try {
      const response = await this.clientesService.obtenerClientePorCc(this.clientForm.value.cedula)
      if (response !== undefined && response.status === 404) {
        return false
      } else {
        return true
      }
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  private async crearCliente(): Promise<boolean> {
    const cliente: Cliente = {
      documento: this.clientForm.value.cedula,
      tipoDocumento: 'CC',
      nombres: this.clientForm.value.nombres,
      apellidos: this.clientForm.value.apellidos,
      telefono: this.clientForm.value.celular,
      correo: this.clientForm.value.correo,
      direccion: this.clientForm.value.direccion,
      ciudad: this.clientForm.value.ciudad
    }
    try {
      const response = await this.clientesService.crearCliente(cliente)
      return await response.status === 201 ? true : false
    } catch (error) {
      console.error(error)
      return false
    }
  }
  private async crearReserva(idVuelo: string): Promise<{ message: string; status: number; _id: string; } | undefined> {
    const reserva: Reserva = {
      numeroAdultos: this.initialQuery.adultos,
      numeroInfantes: this.initialQuery.kids,
      documentoCliente: this.clientForm.value.cedula,
      tarifa: 'economica',
      idVuelo: idVuelo
    }
    try {
      const response = await this.reservasService.crearReserva(reserva)
      return response
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  public submitReserva = async () => {
    this.checkValidity()
    if (this.clientForm.valid) {
      try {
        //booleano que me dice si el cliente ya existe, o no, según su cédula
        const isClient = await this.checkCliente()
        if (!isClient) {
          //Si el cliente no existe, lo creo. El método me devuelve true si se creo con éxito
          let isNewClient = await this.crearCliente()
          if (!isNewClient) {
            window.alert('No se pudo crear el cliente!')
            return
          }
        }
        const responseIda = await this.crearReserva(this.vuelos[0]._id)
        if (responseIda !== undefined) {
          //Si la respuesta de la reserva no es undefined (o sea, se creo), procedo a modificar el vuelo con dos asientos menos
          const asientosIda: Asiento = { idReserva: responseIda._id, categoria: 'economica' }
          await this.inicioService.actualizarVuelo(this.vuelos[0]._id, asientosIda)
        } else {
          window.alert('Hubo un problema guardando la reserva. Intente más tarde.')
          return
        }
        if (this.vuelos[1] !== '') {
          //si hay un vuelo de vuelta, hago el mismo procedimiento de crear una reserva, y nodificar el vuelo
          const responseVuelta = await this.crearReserva(this.vuelos[1]._id)
          if (responseVuelta !== undefined) {
            const asientosVuelta: Asiento = { idReserva: responseVuelta._id, categoria: 'economica' }
            await this.inicioService.actualizarVuelo(this.vuelos[0]._id, asientosVuelta)
          } else {
            window.alert('Hubo un problema guardando la reserva. Intente más tarde.')
            return
          }
        }
        window.alert('¡Reserva generada con éxito!')
        //this.router.navigate(['/reservas'])
      } catch (error) {
        console.error(error)
      }
    }
  }
}


