import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
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
    //

    const params: HttpParams = new HttpParams({ fromObject: query })
    return lastValueFrom(this.http.get(`${environment.apiUrl}/vuelos/buscar`, { params }))

  }
}
