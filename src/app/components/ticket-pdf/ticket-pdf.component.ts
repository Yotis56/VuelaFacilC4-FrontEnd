import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



@Component({
  selector: 'app-ticket-pdf',
  templateUrl: './ticket-pdf.component.html',
  styleUrls: ['./ticket-pdf.component.scss']
})
export class TicketPdfComponent implements OnInit {

  public clienteData: any;
  public reservaIda: any;
  public reservaVuelta: any;
  public vuelos: any;

  ngOnInit(): void {
    const cliente = window.sessionStorage.getItem('datosCliente')
    this.clienteData = typeof (cliente) === 'string' ? JSON.parse(cliente) : {}
    const rIda = window.sessionStorage.getItem('reservaIda')
    this.reservaIda = typeof (rIda) === 'string' ? rIda.slice(0, 8) : ''
    const rVuelta = window.sessionStorage.getItem('reservaVuelta')
    this.reservaVuelta = typeof (rVuelta) === 'string' ? rVuelta.slice(0, 8) : ''
    const vuelosData = window.sessionStorage.getItem('vuelosSeleccionados')
    this.vuelos = typeof (vuelosData) === 'string' ? JSON.parse(vuelosData) : []
  }


  public captureScreen() {
    var data = document.getElementById('contentToConvert');
    if (!data) {
      throw new Error("The element #portal wasn't found");
    }
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 17;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')

      var doc = new jsPDF("l", "in", [17, 5.5]);


      var position = 0;
      doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      doc.save(`VuelaFacil-Reserva${this.reservaIda}.pdf`); // Generated PDF
    });
  }

}
