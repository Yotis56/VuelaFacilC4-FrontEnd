import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public vuelos: any[] = []
  public initialQuery: any

  constructor() { }

  ngOnInit(): void {
    this.getSessionData()
  }

  public getSessionData() {
    const vuelosData = window.sessionStorage.getItem('vuelosSeleccionados')
    this.vuelos = typeof (vuelosData) === 'string' ? JSON.parse(vuelosData) : []
    const queryData = window.sessionStorage.getItem('initialQuery')
    this.initialQuery = typeof (queryData) === 'string' ? JSON.parse(queryData) : null
  }

  getPriceFormat = (distance: number): string => {
    const options = { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }
    let price = distance * 200.353
    return new Intl.NumberFormat('es-CO', options).format(price)
  }


  //falta modoficar el template para mostrar si hay niños.
  //el código de promoción solo se debería mostrar al validar el mismo. Si no se ha ingresado nada, no se muestra el campo
  // Hacer que si hay código de promoción, reste cierto valor al total

}
