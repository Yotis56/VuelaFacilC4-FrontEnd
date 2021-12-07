import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Reserva } from 'src/app/models/ReservaInterface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  constructor(private http: HttpClient) { }

  public crearReserva(reserva: Reserva): Promise<any> {
    const url = `${environment.apiUrl}/reservas`
    return lastValueFrom(this.http.post(url, reserva))
  }
}
