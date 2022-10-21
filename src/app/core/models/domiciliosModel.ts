export class DomiciliosModel {
    nombre_cliente: string;
    direccion_entrega: string;
    telefono_cliente: number;
    direccion_compra: string;
    descripcion: string;
    valor: number;
    iddomiciliario: number;
    fecha: string;
    hora: string;
    estado: number;
    cliente: string
    tipo_compra: number;
    constructor() {
        this.nombre_cliente = '';
        this.direccion_entrega = '';
        this.direccion_compra = '';
        this.telefono_cliente = 0;
        this.iddomiciliario = 0;
        this.descripcion = '';
        this.valor = 0;
        this.fecha = '';
        this.hora = '';
        this.estado = 0;
        this.tipo_compra = 2;
        this.cliente = ''
    }
}