import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DestinosService {

  constructor(private http: HttpClient) { }

  // MÉTODOS SERVICIO AVIONES
  public obtenerDestinos(): Promise<any>{
    const url = `${environment.apiUrl}/obtenerAeropuertos`;
    return this.http.get(url).toPromise();
  }
  public obtenerDestino(id: number){
    
  }
  public agregarDestino(cancion: any){
    
  }
  public actualizarDestino(cancion: any, id: number){
    
  }
  public eliminarDestino(id: number){

  }
}
