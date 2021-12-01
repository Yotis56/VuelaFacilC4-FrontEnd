import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InicioService, QueryVuelos } from 'src/app/services/inicio/inicio.service';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  public buscarVuelosForm: FormGroup = new FormGroup({})
  public ciudades: Array<{ nombre: string, IATA: string }>
  constructor(private fb: FormBuilder, private inicioService: InicioService, private router: Router) {
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
      fechaLlegada: [{ value: '', disabled: this.buscarVuelosForm.value.idaVuelta }],
      adultos: [0, [Validators.required, Validators.min(1)]],
      kids: [0]
    })
  }

  public async sendFormData() {
    //Tengo que guardar esta información en la sesión.
    window.sessionStorage.setItem('initialQuery', JSON.stringify(this.buscarVuelosForm.value))
    this.router.navigate(['/vuelos'])
    //si el idaVuelta es true, tengo que armar dos peticiones a la base de datos.
    //muestro eso en dos páginas

  }

  public cambiarIda(ida: boolean): void {
    if (ida === true) {
      this.buscarVuelosForm.get('fechaLlegada')?.disable()
    } else {
      this.buscarVuelosForm.get('fechaLlegada')?.enable()
    }
  }

}
