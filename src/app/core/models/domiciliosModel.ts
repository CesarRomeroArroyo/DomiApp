export class DomiciliosModel {
    id: number;
    iddomiciliario: number;
    idemprededor: number;
    idcliente: number;
    iddireccion: number;
    tipo_emprende: number;
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
        this.descripcion = '';
        this.valor = 0;
        this.fecha = '';
        this.hora = '';
        this.estado = 0;
        this.cliente = ''
    }
}