export class DomiciliosModel {
    id: number;
    iddomiciliario: number;
    idemprededor: number;
    idcliente: number;
    iddireccion: number;
    tipo_emprende: number;
    tipo_compra: number;
    nombre_cliente: string;
    direccion_entrega: string;
    telefono_cliente: string;
    direccion_compra: string;
    descripcion: string;
    valor: number;
    fecha: string;
    hora: string;
    estado: number;
    cliente: string

    constructor() {
        this.id = 0;
        this.iddomiciliario = 0;
        this.idemprededor = 0;
        this.idcliente = 0;
        this.iddireccion = 0;
        this.tipo_emprende = 0;
        this.tipo_compra = 0;
        this.nombre_cliente = '';
        this.direccion_entrega = '';
        this.telefono_cliente = '';
        this.direccion_compra = '';
        this.descripcion = '';
        this.valor = 0;
        this.fecha = '';
        this.hora = '';
        this.estado = 0;
        this.cliente = ''
    }
}