export class DomiciliosSeguimientosModel {
    id: number;	
    iddomicilio: number;	
    fecha: string;	
    hora: string;	
    estado: number;	
    cliente: string;
    constructor() {
        this.id	= 0;
        this.iddomicilio = 0;	
        this.fecha = '';
        this.hora = '';	
        this.estado	= 0;
        this.cliente  = '';
    }
}