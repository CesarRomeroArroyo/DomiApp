export class DomiciliarioVehiculoModel{
    id: number;
    iddomiciliario: number;
    placa: string;
    modelo: string;
    linea: string;
    marca: string;
    tarjeta_propiedad: string;
    observaciones: string;
    estado: number;
    principal: string;
    cliente: string;
    constructor() {
        this.id = 0;
        this.iddomiciliario = 0;
        this.placa = "";
        this.modelo = "";
        this.linea = "";
        this.marca = "";
        this.tarjeta_propiedad = "";
        this.observaciones = "";
        this.estado = 0;
        this.principal = "";
        this.cliente = "";
    }
}