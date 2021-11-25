import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InicioService, QueryVuelos } from 'src/app/services/inicio/inicio.service';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  public buscarVuelosForm: FormGroup = new FormGroup({})
  public ciudades: Array<{ nombre: string, IATA: string }>
  constructor(private fb: FormBuilder, private inicioService: InicioService) {
    this.ciudades = [
      { nombre: 'Bogotá', IATA: 'BOG' },
      { nombre: 'Bucaramanga', IATA: 'BGA' },
      { nombre: 'Barranquilla', IATA: 'BAQ' },
      { nombre: 'Cartagena', IATA: 'CTG' },
      { nombre: 'Cali', IATA: 'CLO' },
      { nombre: 'Medellín', IATA: 'MDE' },
    ]
  }

  ngOnInit(): void {
    this.buscarVuelosForm = this.fb.group({
      idaVuelta: [true],
      origen: [null, Validators.required],
      destino: [null, Validators.required],
      fechaSalida: ['', Validators.required],
      fechaLlegada: [''],
      adultos: [0, [Validators.required, Validators.min(1)]],
      niños: [0]
    })
  }

  public async buscarVuelos() {
    console.log(this.buscarVuelosForm.value)

    //Tengo que guardar esta información en la sesión.
    //si el idaVuelta es true, tengo que armar dos peticiones a la base de datos.
    //muestro eso en dos páginas
    const queryIda: QueryVuelos = {
      IATASalida: this.buscarVuelosForm.value.origen,
      IATALlegada: this.buscarVuelosForm.value.destino,
      fecha: this.buscarVuelosForm.value.fechaSalida
    }
  }

  public cambiarIda(value: boolean): void {
    this.buscarVuelosForm.value.idaVuelta = value
  }

}
