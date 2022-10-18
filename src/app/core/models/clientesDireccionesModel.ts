export class ClientesDireccionesModel {
    id: number;
    idcliente:number;
    direccion: string;
    ciudad: string;
    barrio: string;
    zona: string;
    principal: string;
    lon: string;
    lat: string;
    cliente: string;
    constructor() {
        this.id = 0;
        this.idcliente = 0;
        this.direccion = '';
        this.ciudad = '';
        this.barrio = '';
        this.zona = '';
        this.principal = '';
        this.lon = '';
        this.lat = '';
        this.cliente = '';
    }
}