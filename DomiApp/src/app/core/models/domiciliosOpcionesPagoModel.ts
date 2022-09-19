export class DomiciliosOpcionesPagoModel {
    id: number;
    nombre: string;	
    numero: string;	
    estado: number;	
    cliente: string;	
    constructor() {
        this.id = 0;	
        this.nombre = '';	
        this.numero= '';	
        this.estado= 0;	
        this.cliente='';
    }
}