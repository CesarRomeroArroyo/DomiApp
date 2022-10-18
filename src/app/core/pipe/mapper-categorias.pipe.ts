import { Pipe, PipeTransform } from "@angular/core";
import { ProxyService } from "../services/proxy.service";

@Pipe({
  name: "mapperCategoria",
})
export class MapperCategoriaPipe implements PipeTransform {
  categorias: any;
  
  constructor(private proxyService: ProxyService) { }
  
  transform(value: any[]): any {
    this.getCategoria();
    return !!value ? this.mapCategoria(value) : [];
  }

  mapCategoria(data: void | any[]) {
    let productos: any[] = [];
    if (!!data && data.length > 0) {
      data.forEach((producto) => {
        productos.push({
          id: producto.id,
          codigo: producto.codigo,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          categoria_id: producto.categoria,
          categoria: this.selectCategoria(producto.categoria),
          foto: producto.foto,
          state: producto.state,
          pres_pro: producto.pres_pro,
          mar_pro: producto.mar_pro,
          cost_serv: producto.cost_serv,
          apli_ciu: producto.apli_ciu,
          pais: producto.pais,
          depto: producto.depto,
          ciu: producto.ciu,
          apli_veh: producto.apli_veh,
          tip_veh: producto.tip_veh,
          apli_tip_mer: producto.apli_tip_mer,
          tip_mer: producto.tip_mer,
          tipo:  producto.tipo,
          cod_cum: producto.cod_cum,
          lote: producto.lote,
          vence: producto.vence,
          cod_medicamento: producto.cod_medicamento,
          mezcla: producto.mezcla,
          cliente: producto.cliente,
        });
      });
    }
    return productos;
  }

  async getCategoria() {
    this.categorias = await this.proxyService.getMethod("list/categorias/");
  }

  selectCategoria(id: number) {
    let result: any[];
    result = <Array<any>>this.categorias;
    const { nombre } = result.find(categoria => categoria.id == id);
    return nombre;   
  }
}
