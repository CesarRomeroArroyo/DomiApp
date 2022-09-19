export class DomiciliarioUbicacionModel {
    id: number;
    iddomiciliario: number;
    lon: string;
    lat: string;
    cliente: string;
    constructor() {
        this.id = 0;
        this.iddomiciliario = 0;
        this.lon = '';
        this.lat = '';
        this.cliente = '';
    }
}