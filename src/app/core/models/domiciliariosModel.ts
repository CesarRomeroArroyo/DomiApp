export class DomiciliarioModel {
    id: number;
    nombre: string; 
    tip_ide: string; 
    num_ide:string;  
    direccion: string; 
    email: string; 
    telefono: string; 
    usuario:string; 
    password:string; 
    licencia: string; 
    fecha_licencia:string; 
    pasado_judicial: string;
    fecha_pasado: string; 
    comparendos: string;
    valor_comparendos:string;
    pago_domicilio: string;
    foto: string;
    observaciones: string;
    estado: number;
    cliente: string;
    idunico: string;
    constructor() {
        this.id = 0;
        this.nombre =  ''; 
        this.tip_ide =  ''; 
        this.num_ide = '';  
        this.direccion =  ''; 
        this.email =  ''; 
        this.telefono =  ''; 
        this.usuario = ''; 
        this.password = ''; 
        this.licencia =  ''; 
        this.fecha_licencia = ''; 
        this.pasado_judicial =  '';
        this.fecha_pasado =  ''; 
        this.comparendos =  '';
        this.valor_comparendos = '';
        this.pago_domicilio= '';
        this.foto= '';
        this.observaciones= '';
        this.estado = 1;
        this.cliente= '';
        this.idunico = '';
    }
}