import { Component, OnInit } from '@angular/core';
import { destinoModel } from 'src/app/models/detino';
import { DestinosService } from 'src/app/services/destinos/destinos.service';

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.component.html',
  styleUrls: ['./destinos.component.scss']
})
export class DestinosComponent implements OnInit {

  public destinos:destinoModel[] = [];           // Array para guardar los aviones de la petición a DB

  constructor(private destinosService:DestinosService) { }

  async ngOnInit(): Promise <void> {
    this.destinos = await this.obtenerDestinos();
    console.log(this.destinos);
  }
  public async obtenerDestinos(): Promise<any>{
    try {
      const response = await this.destinosService.obtenerDestinos();
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
