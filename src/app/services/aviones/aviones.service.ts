import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvionesService {

  constructor(private http: HttpClient) {         // Inyecto el HTTP Client

  }

  // MÉTODOS SERVICIO AVIONES
  public obtenerAviones(): Promise<any>{
    const url = `${environment.apiUrl}/obtenerAviones`;
    return this.http.get(url).toPromise();
  }
  public obtenerAvion(id: number){
    
  }
  public agregarAvion(cancion: any){
    
  }
  public actualizarAvion(cancion: any, id: number){
    
  }
  public eliminarAvion(id: number){

  }
}
