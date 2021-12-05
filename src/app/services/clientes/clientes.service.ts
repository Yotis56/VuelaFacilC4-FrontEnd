import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  public async obtenerClientePorCc(cedula: string): Promise<any> {
    const url = `${environment.apiUrl}/clientes/buscar?cedula=${cedula}`;
    try {
      return await lastValueFrom(this.http.get(url))
    } catch (error) {
      console.error(error)
      return undefined
    }
  }
}
