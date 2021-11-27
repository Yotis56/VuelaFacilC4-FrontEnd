export interface Vuelos {
  asientosReservados: Array<{
    asiento: string,
    categoria: "economica" | "ejecutiva",
    idReserva: string
  }>,
  fechaVuelo: string,
  matriculaAvion: string,
  ruta: {
    distancia: { $numberDouble: string },
    duracionVuelo: string,
    llegada: Aeropuerto,
    salida: Aeropuerto,
    _id: string
  }
}

export interface Aeropuerto {
  IATA: string,
  ciudad: string,
  nombre: string
}