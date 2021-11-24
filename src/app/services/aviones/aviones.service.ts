import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { avionModel } from 'src/app/models/avion';

@Injectable({
  providedIn: 'root'
})
export class AvionesService {

  constructor(private http: HttpClient) {         // Inyecto el HTTP Client

  }

  // MÉTODOS SERVICIO AVIONES
  public obtenerAviones(): Promise<any> {
    const url = `${environment.apiUrl}/aviones`;
    return lastValueFrom(this.http.get(url))
  }
  public obtenerAvion(id: number) {

  }
  public agregarAvion(avion: avionModel): Promise<any> {
    return lastValueFrom(this.http.post(`${environment.apiUrl}/aviones`, avion))
  }

  public actualizarAvion(cancion: any, id: number) {

  }
  public eliminarAvion(id: string): Promise<any> {
    console.log(`Se quiere eliminar el avión con Id: ${id}`)
    return lastValueFrom(this.http.delete(`${environment.apiUrl}/aviones/${id}`))
  }
}
