import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { avionModel } from 'src/app/models/avion';
import { AvionesService } from 'src/app/services/aviones/aviones.service';

@Component({
  selector: 'app-aviones',
  templateUrl: './aviones.component.html',
  styleUrls: ['./aviones.component.scss']
})
export class AvionesComponent implements OnInit {

  public aviones: avionModel[] = [];           // Array para guardar los aviones de la petición a DB

  constructor(private avionesService: AvionesService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.aviones = await this.obtenerAviones();
    console.log(this.aviones);
  }

  public async obtenerAviones(): Promise<any> {
    try {
      const response = await this.avionesService.obtenerAviones();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public async borrarAvion(id: string): Promise<any> {
    try {
      const response = await this.avionesService.eliminarAvion(id)
      if (response.status === 200) {
        window.alert('Se Borró el avión con éxito')
        this.router.navigate(['/aviones'])
      }
      //faltaría poner algo en caso de que no se pueda borrar. Mandar a una página de error
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }
}
