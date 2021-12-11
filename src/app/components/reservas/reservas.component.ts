import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent implements OnInit {

  public isReserva: boolean = false;
  public isIdaVuelta: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (typeof (window.sessionStorage.getItem('reservaIda')) === 'string') this.isReserva = true
  }

}
