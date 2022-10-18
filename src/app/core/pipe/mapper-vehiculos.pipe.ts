import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapperVehiculos'
})
export class MapperVehiculosPipe implements PipeTransform {

  transform(value: any[]):any{
    return !!value
    ? this.mapVehiculos(value)
    : [];
  }

  mapVehiculos(data: void | any[]) {
    let vehiculos: any[] = [];
    if (!!data && data.length > 0) {
      data.forEach(vehiculo => {
        vehiculos.push({
          id: vehiculo.id,
          estado: vehiculo.estado,
          cliente: vehiculo.cliente,
          iddomiciliario: vehiculo.iddomiciliario,
          linea: vehiculo.linea,
          marca: vehiculo.marca,
          modelo: vehiculo.modelo,
          observaciones:vehiculo.observaciones,
          placa:vehiculo.placa,
          principal:vehiculo.principal=='1' ? 'Si':'No',
          tarjeta_propiedad:vehiculo.tarjeta_propiedad,
        });
      });
    }
    return vehiculos;
  }
}
