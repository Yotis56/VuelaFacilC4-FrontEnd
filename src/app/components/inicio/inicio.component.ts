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
  constructor(private fb: FormBuilder, private router: Router) {
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

  public setDateIda(): void{
    // Obtener fecha si la hay
    var regreso: string = (<HTMLInputElement>document.getElementById("fechaRegreso")).value;

    // Min
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("fechaSalida")[0].setAttribute('min', today);

    // Max
    if(regreso!==''){
      document.getElementsByName("fechaSalida")[0].setAttribute('max', regreso);
    }else{
      document.getElementsByName("fechaSalida")[0].setAttribute('max', '2050-01-01');
    }

  }

  public setDateRegreso(): void{
    // Obtener fecha si la hay
    var ida: string = (<HTMLInputElement>document.getElementById("fechaSalida")).value;

    // Min
    if(ida!==''){
      document.getElementsByName("fechaRegreso")[0].setAttribute('min', ida);
    }else{
      var today = new Date().toISOString().split('T')[0];
      document.getElementsByName("fechaRegreso")[0].setAttribute('min', today);
    }
  }
}
