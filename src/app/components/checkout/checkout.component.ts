import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes/clientes.service';

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

  constructor(private fb: FormBuilder, private clientesService: ClientesService) { }

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
    return distance * 200.353
  }

  public getPriceFormat = (price: number): string => {
    const options = { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }
    return new Intl.NumberFormat('es-CO', options).format(price)
  }
  public getTotalPrice = () => {
    const precioIda = this.vuelos[0].ruta.distancia * 200.353
    const precioVuelta = this.vuelos[1] !== '' ? this.vuelos[1].ruta.distancia * 200.353 : 0
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
  public submitReserva = () => {
    this.checkValidity()
    if (this.clientForm.valid) {
      this.crearReserva()
    }
  }

  private async checkCliente(): Promise<boolean | undefined> {
    //regresa true si el cliente existe, false si no. Y undefined si encontró algún error.
    try {
      const cliente = await this.clientesService.obtenerClientePorCc(this.clientForm.value.cedula)
      if (cliente !== undefined && cliente.status === 404) {
        return false
      } else {
        return true
      }
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  private crearCliente() {
    //Acá tengo que crear un objeto con los datos del cliente y mandarlo al servicio
    //programar servicio de crear cliente
  }

  private crearReserva() {
    //Reviso si el cliente existe
    if (!this.checkCliente()) this.crearCliente()

    //si existe, no hago nada. Si no existe, tengo que crearlo.
    //Creo la reserva: asigno el número de adultos, de niños, el documento del cliente, tarifa (no se ha programado) y id de vuelo
    //En el vuelo, tengo que hacer un update con dos vuelos menos

    //guardo la reserva.
  }
}
