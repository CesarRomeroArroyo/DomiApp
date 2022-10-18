import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapperDirecciones'
})
export class MapperDireccionesPipe implements PipeTransform {
  transform(value: any[]): any {
    return !!value
      ? this.mapDirecciones(value)
      : [];
  }

  mapDirecciones(data: void | any[]) {
    let direcciones: any[] = [];
    if (!!data && data.length > 0) {
      data.forEach(direccion => {
        direcciones.push({
          id: direccion.id,
          idcliente: direccion.idcliente,
          direccion: direccion.id,
          ciudad: direccion.ciudad,
          barrio: direccion.barrio,
          zona: direccion.zona,
          principal: direccion.principal == '1' ? 'Si' : 'No',
          lon: direccion.lon,
          lat: direccion.lat,
          cliente: direccion.cliente,
        });
      });
    }
    return direcciones;
  }
}
