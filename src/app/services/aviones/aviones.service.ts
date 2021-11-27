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

  public async actualizarAvion(id: string | undefined, avion: avionModel) : Promise<any>{
    console.log(`Se quiere actualizar el avión con Id: ${id}`)
    const url = `${environment.apiUrl}/aviones/${id}`;
    return await this.http.put(`${url}`, avion,{responseType: 'text'}).toPromise();   // Tuve que definir que la respuessta es un texto, tira error HTTP porque espera un JSON que no peude parsear
  }
  
  public eliminarAvion(id: string): Promise<any> {
    console.log(`Se quiere eliminar el avión con Id: ${id}`)
    return lastValueFrom(this.http.delete(`${environment.apiUrl}/aviones/${id}`))
  }
}
