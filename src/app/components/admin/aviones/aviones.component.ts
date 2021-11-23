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

  public aviones:avionModel[] = [];           // Array para guardar los aviones de la petición a DB

  constructor(private avionesService: AvionesService) { }

  async ngOnInit(): Promise <void> {
    this.aviones = await this.obtenerAviones();
    console.log(this.aviones);
  }

  public async obtenerAviones(): Promise<any>{
    try {
      const response = await this.avionesService.obtenerAviones();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

}
