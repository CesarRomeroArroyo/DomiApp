export class EmprendedoresModel {
    id: number;	
    nombre: string;	
    tip_ide: string;	
    num_ide: string;	
    direccion: string;	
    telefono: string;	
    email: string;	
    tipo: number;	
    usuario: string;	
    password: string;	
    lon: string;	
    lat: string;	
    estado: number;	
    valor_domicilio: number;
    pago_domiciliario:number;
    cliente: string;	
    idunico: string;
    constructor() {
        this.id = 0;	
        this.nombre = '';	
        this.tip_ide = '';	
        this.num_ide = '';	
        this.direccion = '';	
        this.telefono = '';	
        this.email = '';	
        this.tipo = 0;	
        this.usuario = '';	
        this.password = '';	
        this.lon = '';	
        this.lat = '';	
        this.estado = 0;	
        this.pago_domiciliario = 0;
        this.valor_domicilio = 0;
        this.cliente = '';
        this.idunico = '';
    }
}