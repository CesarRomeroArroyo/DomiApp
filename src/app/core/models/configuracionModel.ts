export class Configuracion {
  id: number;
  forma_asignacion_domicilio: number;
  pago_del_emprendedor: number;
  valor_pago_emprendedor: number;
  pago_domiciliario: number;
  valor_pago_domiciliario: number;
  forma_pago_domiciliario: number;
  cliente: string;
  constructor() {
    this.id = 0;
    this.forma_asignacion_domicilio = 0;
    this.pago_del_emprendedor = 0;
    this.valor_pago_emprendedor = 0;
    this.pago_domiciliario = 0;
    this.valor_pago_domiciliario = 0;
    this.forma_pago_domiciliario = 0;
    this.cliente = "";
  }
}