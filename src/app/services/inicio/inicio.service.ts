import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Asiento } from 'src/app/models/AsientoInterface';
import { environment } from 'src/environments/environment';

export interface QueryVuelos {
  IATASalida: string,
  IATALlegada: string,
  fecha: string
}

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  constructor(private http: HttpClient) { }

  public async buscarVuelos(query: { IATASalida: string; IATALlegada: string; fecha: string; }): Promise<any> {
    const params: HttpParams = new HttpParams({ fromObject: query })
    try {
      return await lastValueFrom(this.http.get(`${environment.apiUrl}/vuelos/buscar`, { params }))
    } catch (error) {
      console.log(error)
    }
  }
  public actualizarVuelo(idVuelo: string, body: Asiento) {
    const url = `${environment.apiUrl}/vuelos/${idVuelo}`
    const headers: HttpHeaders = new HttpHeaders({ 'push': 'true' })
    return lastValueFrom(this.http.put(url, body, { headers }))
  }
}
