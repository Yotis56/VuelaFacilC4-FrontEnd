import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { avionModel } from 'src/app/models/avion';
import { AvionesService } from 'src/app/services/aviones/aviones.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-aviones',
  templateUrl: './aviones.component.html',
  styleUrls: ['./aviones.component.scss']
})
export class AvionesComponent implements OnInit {

  public addAvionformGroup: FormGroup = new FormGroup({})
  public aviones: avionModel[] = [];           // Array para guardar los aviones de la petición a DB

  constructor(private avionesService: AvionesService, private router: Router, private formBuilder: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    this.addAvionformGroup = this.formBuilder.group({
      marca: ['', [Validators.required]],
      matricula: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      capacidadEjecutiva: ['', [Validators.required]],
      capacidadEconomica: ['', [Validators.required]]
    })

    this.aviones = await this.obtenerAviones();

    console.log(this.addAvionformGroup)
  }

  public async obtenerAviones(): Promise<any> {
    try {
      const response = await this.avionesService.obtenerAviones();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public async borrarAvion(id: string | undefined): Promise<any> {
    if (id === undefined) {
      return
    } else {
      try {
        const response = await this.avionesService.eliminarAvion(id)
        if (response.status === 200) {
          window.alert('Se Borró el avión con éxito')
          window.location.reload()
        }
        //faltaría poner algo en caso de que no se pueda borrar. Mandar a una página de error
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
  }

  public async agregarAvion() {
    const nuevoAvion: avionModel = this.addAvionformGroup.value
    try {
      const response = await this.avionesService.agregarAvion(nuevoAvion)
      if (response.status === 201) {
        window.alert('Se agregó el avión con éxito')
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
    }
  }
}
