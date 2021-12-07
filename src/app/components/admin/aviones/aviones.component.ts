import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { avionModel } from 'src/app/models/avion';
import { AvionesService } from 'src/app/services/aviones/aviones.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-aviones',
  templateUrl: './aviones.component.html',
  styleUrls: ['./aviones.component.scss']
})
export class AvionesComponent implements OnInit {

  public addAvionformGroup: FormGroup = new FormGroup({})
  public aviones: avionModel[] = [];           // Array para guardar los aviones de la petición a DB
  public avionActualizar: avionModel | null = null;     //Para almacenar el objeto avion a actualizar

  constructor(private avionesService: AvionesService, private formBuilder: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    this.buildForm();
    localStorage.clear();                     // Borrar el localStorage
    this.aviones = await this.obtenerAviones();
    //console.log(this.addAvionformGroup);
    const actualizar = localStorage.getItem('avionActualizar');   // Obtengo en actualizar loss valores dle avion a actualizar
    this.avionActualizar = actualizar ? JSON.parse(actualizar) : null;
    //console.log(this.avionActualizar);

  }

  private buildForm() {
    this.addAvionformGroup = this.formBuilder.group({
      marca: [this.avionActualizar?.marca, [Validators.required]],
      matricula: [this.avionActualizar?.matricula, [Validators.required]],
      modelo: [this.avionActualizar?.modelo, [Validators.required]],
      capacidadEjecutiva: [this.avionActualizar?.capacidadEjecutiva, [Validators.required]],
      capacidadEconomica: [this.avionActualizar?.capacidadEconomica, [Validators.required]]
    })
  }

  public async obtenerAviones(): Promise<any> {
    try {
      const response = await this.avionesService.obtenerAviones();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public async borrarAvion(id: string | undefined): Promise<any> {
    if (id === undefined) {
      return
    } else {
      try {
        const response = await this.avionesService.eliminarAvion(id)
        if (response.status === 200) {
          window.alert('Se Borró el avión con éxito')
          window.location.reload()
        }
        //faltaría poner algo en caso de que no se pueda borrar. Mandar a una página de error
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
  }

  public async agregarAvion() {
    const nuevoAvion: avionModel = this.addAvionformGroup.value
    try {
      const response = await this.avionesService.agregarAvion(nuevoAvion)
      if (response.status === 201) {
        window.alert('Se agregó el avión con éxito')
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
    }
  }

  public async actualizarAvion() {
    var id: string = this.avionActualizar?._id!;
    console.log(`El ID: ${id}`);
    const nuevoAvion: avionModel = {
      ...this.addAvionformGroup.value
    }
    console.log(nuevoAvion)
    try {
      const response = await this.avionesService.actualizarAvion(id, nuevoAvion)
      console.log(response)
      if (response === 'se actualizaron correctamente los parametros') {
        window.alert('Se actualizó el avión con éxito')
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
    }
  }

  public irActualizarAvion(avion: avionModel) {      // Método para enrutar botón de editar al form
    localStorage.setItem('avionActualizar', JSON.stringify(avion));   // Asigno los valores antiguos al objeto (Modelo / Valor)
    const actualizar = localStorage.getItem('avionActualizar');   // Obtengo en actualizar loss valores dle avion a actualizar
    this.avionActualizar = actualizar ? JSON.parse(actualizar) : null;
    this.buildForm();
    console.log(this.avionActualizar);
  }

  public cerrarModal() {
    localStorage.clear();                     // Borrar el localStorage
    if (this.avionActualizar !== null) {
      this.avionActualizar = null;
      this.buildForm();
    }
    console.log(this.avionActualizar);
  }
}
